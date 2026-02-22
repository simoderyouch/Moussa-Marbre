import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const csvFilePath = path.join(process.cwd(), 'data', 'wordpress_products_import.csv');
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

    for (const record of records) {
        // Determine numeric values
        const regularPrice = record['Regular price'] ? parseFloat(record['Regular price']) : null;
        const published = record['Published'] === '1';
        const inStock = record['In stock?'] === '1';

        // Find or create category
        const categoryName = record['Categories']?.trim();
        let categoryId = null;

        if (categoryName) {
            const category = await prisma.category.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName },
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
