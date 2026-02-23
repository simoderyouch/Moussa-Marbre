import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

function determineCategory(title: string, description: string): string {
    const text = `${title} ${description}`.toLowerCase();

    if (text.includes('vanity') || text.includes('bathroom') || text.includes('sink') || text.includes('basin')) {
        return 'Salles de Bain';
    }
    if (text.includes('kitchen') || text.includes('cabinet') || text.includes('countertop')) {
        return 'Cuisines';
    }
    if (text.includes('exterior') || text.includes('facade') || text.includes('outdoor wall') || text.includes('cladding')) {
        return 'Extérieurs & Façades';
    }
    if (text.includes('staircase') || text.includes('stair') || text.includes('step')) {
        return 'Escaliers';
    }
    if (text.includes('fire') || text.includes('fireplace') || text.includes('hearth')) {
        return 'Cheminées & Salons';
    }
    if (text.includes('pool')) {
        return 'Piscines';
    }
    if (text.includes('patio') || text.includes('walkway') || text.includes('driveway') || text.includes('cobble') || text.includes('paver') || text.includes('outdoor')) {
        return 'Aménagement Extérieur';
    }
    if (text.includes('floor') || text.includes('wall') || text.includes('interior')) {
        return 'Sols & Murs Intérieurs';
    }
    return 'Autres Réalisations';
}

async function main() {
    console.log('Starting projects seed from CSV...');

    // Wipe existing projects
    console.log('Wiping existing projects and categories...');
    await prisma.project.deleteMany();
    await prisma.projectCategory.deleteMany();

    // Read CSV
    const csvPath = path.join(process.cwd(), 'projects.csv');
    if (!fs.existsSync(csvPath)) {
        console.error(`CSV file not found: ${csvPath}`);
        process.exit(1);
    }

    const csvData = fs.readFileSync(csvPath, 'utf8');
    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
    }) as { Title: string, Description: string, Filename: string }[];

    console.log(`Found ${records.length} records in CSV.`);

    const categoryMap = new Map<string, number>();

    let count = 0;
    for (const record of records) {
        const title = record.Title;
        const description = record.Description;
        const filename = record.Filename;

        // Determine category dynamically
        const categoryName = determineCategory(title, description);

        // Ensure category exists in DB and Map
        if (!categoryMap.has(categoryName)) {
            const category = await prisma.projectCategory.create({
                data: { name: categoryName }
            });
            categoryMap.set(categoryName, category.id);
        }

        const categoryId = categoryMap.get(categoryName)!;
        const imageUrl = `/api/projects-images/${filename}`;

        await prisma.project.create({
            data: {
                title,
                description,
                image: imageUrl,
                categoryId,
                published: true,
            }
        });

        count++;
    }

    console.log(`Successfully seeded ${count} projects and created ${categoryMap.size} categories.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
