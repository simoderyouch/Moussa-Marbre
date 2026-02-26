import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const images = [
        "WhatsApp Image 2026-02-25 at 21.20.21.jpeg",
        "WhatsApp Image 2026-02-25 at 21.20.22 (1).jpeg",
        "WhatsApp Image 2026-02-25 at 21.20.22.jpeg"
    ];

    let categoryId = 18;

    // First check if category 18 exists
    const cat18 = await prisma.projectCategory.findUnique({ where: { id: 18 } });
    if (!cat18) {
        console.log("Category 18 doesn't exist. Looking for 'Cuisines' category...");
        const cuisinesCat = await prisma.projectCategory.findUnique({ where: { name: 'Cuisines' } });
        if (cuisinesCat) {
            categoryId = cuisinesCat.id;
            console.log(`Found 'Cuisines' with ID ${categoryId}. Using that instead.`);
        } else {
            console.log("Creating new category 'Cuisines'...");
            const newCat = await prisma.projectCategory.create({ data: { name: 'Cuisines' } });
            categoryId = newCat.id;
        }
    } else {
        console.log(`Found category 18 (${cat18.name}). Proceeding...`);
    }

    for (const img of images) {
        await prisma.project.create({
            data: {
                title: "Kitchen",
                description: "Projet de cuisine (Kitchen)",
                image: `/projects-images/${img}`,
                categoryId: categoryId,
                published: true,
            }
        });
        console.log(`Added project for ${img}`);
    }

    console.log("Successfully added all 3 images!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
