import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TARGET_CATEGORIES = [
    'Salles de Bain',
    'Escaliers',
    'Extérieur',
    'Cuisines',
    'Intérieurs',
    'Piscines'
];

function getTargetCategoryName(oldName: string): string {
    const lower = oldName.toLowerCase();

    if (lower.includes('bain') || lower.includes('vasque')) return 'Salles de Bain';
    if (lower.includes('escalier')) return 'Escaliers';
    if (lower.includes('extéri') || lower.includes('facade') || lower.includes('façade') || lower.includes('allée')) return 'Extérieur';
    if (lower.includes('cuisine')) return 'Cuisines';
    if (lower.includes('piscine')) return 'Piscines';

    // Default fallback to Intérieurs (for salons, murs intérieurs, autres réalisations, etc.)
    return 'Intérieurs';
}

async function main() {
    console.log('Merging project categories...');

    // 1. Ensure target categories exist
    const targetCategoryIds = new Map<string, number>();
    for (const targetName of TARGET_CATEGORIES) {
        let cat = await prisma.projectCategory.findUnique({ where: { name: targetName } });
        if (!cat) {
            cat = await prisma.projectCategory.create({ data: { name: targetName } });
            console.log(`Created new target category: ${targetName}`);
        }
        targetCategoryIds.set(targetName, cat.id);
    }

    // 2. Find all categories
    const allCategories = await prisma.projectCategory.findMany({
        include: { _count: { select: { projects: true } } }
    });

    let mergedCount = 0;
    let deletedCount = 0;

    for (const category of allCategories) {
        // If it's already one of the exact targets, skip
        if (TARGET_CATEGORIES.includes(category.name)) {
            continue;
        }

        const targetName = getTargetCategoryName(category.name);
        const targetId = targetCategoryIds.get(targetName)!;

        console.log(`Mapping old category "${category.name}" (${category._count.projects} projects) -> "${targetName}"`);

        // Update all projects linking to the old category
        if (category._count.projects > 0) {
            await prisma.project.updateMany({
                where: { categoryId: category.id },
                data: { categoryId: targetId }
            });
            mergedCount += category._count.projects;
        }

        // Delete the old category
        await prisma.projectCategory.delete({
            where: { id: category.id }
        });
        deletedCount++;
    }

    console.log(`Successfully merged ${mergedCount} projects and deleted ${deletedCount} old categories.`);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
