import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const csvFilePath = path.join(process.cwd(), 'public', 'images', 'wordpress_products_import.csv');
    console.log(`Reading CSV from ${csvFilePath}`);

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse CSV
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    console.log(`Parsed ${records.length} products from CSV. Seeding database...`);

    // Clear existing records
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('Cleared existing products and categories.');

    for (const record of records as any[]) {
        // Determine numeric values
        const regularPrice = record['Regular price'] ? parseFloat(record['Regular price']) : null;
        const published = record['Published'] === '1';
        const inStock = record['In stock?'] === '1';

        // Handle Category Name mapping and ordering
        let rawCategoryName = record['Categories']?.trim();

        // As per user request, id 3 (Marbre importé) should be just 'Marbre'
        if (rawCategoryName === 'Marbre importé') {
            rawCategoryName = 'Marbre';
        }

        let categoryId = null;

        if (rawCategoryName) {
            // Determine order based on user request: 
            // 1. Marbre local
            // 2. Pierre NaturelleTahejart
            // 3. Marbre
            // 4. Granit
            let order = 99; // Default for anything else
            const nameLower = rawCategoryName.toLowerCase();
            if (nameLower === 'marbre local') order = 1;
            else if (nameLower === 'pierre naturelletahejart' || nameLower === 'pierre naturelle tahejart' || nameLower === 'pierre de taza') order = 2;
            else if (nameLower === 'marbre') order = 3;
            else if (nameLower === 'granit') order = 4;

            const category = await prisma.category.upsert({
                where: { name: rawCategoryName },
                update: { order: order },
                create: { name: rawCategoryName, order: order },
            });
            categoryId = category.id;
        }

        // Fix image path to point to the express static route properly
        let imagePath = record['Images'] || '';
        if (imagePath.startsWith('./')) {
            imagePath = `/api/images/${imagePath.substring(2)}`;
        }

        await prisma.product.create({
            data: {
                name: record['Name'] || '',
                regularPrice: Number.isNaN(regularPrice) ? null : regularPrice,
                images: imagePath,
                categoryId: categoryId,
                type: record['Type'] || '',
                published: published,
                visibility: record['Visibility in catalog'] || '',
                inStock: inStock,
            },
        });
    }

    console.log('Successfully seeded database!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
