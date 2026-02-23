import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projectsData = [
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        categoryName: 'FACADES',
        subtitle: 'Siège Social, Casablanca',
        title: 'Projet SGTM',
        description: "Fourniture et pose de marbre et granit pour la Société Générale des Travaux du Maroc. Un projet d'envergure alliant robustesse et prestige."
    },
    {
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
        categoryName: 'VASQUES',
        subtitle: 'Restaurant L\'Assiette, Rabat',
        title: 'Restaurant L\'Assiette',
        description: 'Aménagement complet en pierre naturelle : comptoirs, plans de travail et vasques sur mesure pour un espace gastronomique d\'exception.'
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
        categoryName: 'FACADES',
        subtitle: 'Hôtel The Ranch, Taza',
        title: 'Hôtel The Ranch',
        description: "Habillage complet en marbre et pierre naturelle pour l'Hôtel The Ranch. Façades, halls et espaces communs sublimés par un travail artisanal d'excellence."
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        categoryName: 'CHEMINEES',
        subtitle: 'Villa Privée, Casablanca',
        title: 'Cheminée en Travertin Strie',
        description: 'Habillage cheminée en travertin strié avec soubassement en marbre poli gris. Un équilibre parfait entre modernité et élégance naturelle.'
    },
    {
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
        categoryName: 'SALLES DE BAIN',
        subtitle: 'Hôtel The Ranch, Taza',
        title: 'Salle de Bain Pierre Naturelle',
        description: 'Aménagement complet en pierre naturelle : murs, sol, vasque sculptée et douche à l\'italienne. Un écrin de luxe minéral.'
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
        categoryName: 'FACADES',
        subtitle: 'Résidence Haut Standing, Rabat',
        title: 'Façade en Ardoise Multicolore',
        description: "Habillage extérieur en ardoise naturelle multicolore, alliant nuances de gris, ocre et rouille pour un caractère unique."
    },
    {
        image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&q=80',
        categoryName: 'PISCINES',
        subtitle: 'Villa Contemporaine, Marrakech',
        title: 'Margelle Piscine en Pierre Grise',
        description: 'Margelle de piscine en pierre naturelle grise, finition antidérapante. Intégration parfaite avec l\'aménagement paysager.'
    },
    {
        image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
        categoryName: 'ALLEES',
        subtitle: 'Jardin Privé, Fès',
        title: 'Allée en Opus Incertum',
        description: 'Allée de jardin en opus incertum, mélange de pierres naturelles aux teintes chaudes et froides, éclairée pour un effet spectaculaire.'
    },
    {
        image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=600&q=80',
        categoryName: 'VASQUES',
        subtitle: 'Suite Présidentielle, Tanger',
        title: 'Vasque Sculptée en Marbre Gris',
        description: 'Vasque sculptée à la main dans un marbre gris aux veines subtiles. Design contemporain aux lignes épurées.'
    },
    {
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
        categoryName: 'FACADES',
        subtitle: 'Showroom, Taza',
        title: 'Mur en Pierre de Taza',
        description: "Habillage mural intérieur en pierre de Taza, texture brute et authentique pour un espace d'exposition unique."
    },
    {
        image: 'https://images.unsplash.com/photo-1620626012053-1f9a3069e07b?w=600&q=80',
        categoryName: 'VASQUES',
        subtitle: 'Villa de Luxe, Ifrane',
        title: 'Vasque Ronde en Marbre',
        description: 'Vasque ronde en marbre gris poli, forme organique et finition impeccable. Un objet d\'art fonctionnel.'
    }
];

async function main() {
    console.log('Start seeding projects...');

    // Clear old projects and project categories to prevent duplication
    await prisma.project.deleteMany();
    await prisma.projectCategory.deleteMany();
    console.log('Cleared existing project data.');

    // Create Project Categories
    const uniqueCategoryNames = Array.from(new Set(projectsData.map(p => p.categoryName)));

    const categoryMap = new Map();
    for (const name of uniqueCategoryNames) {
        const category = await prisma.projectCategory.create({
            data: { name }
        });
        categoryMap.set(name, category.id);
    }
    console.log(`Created ${categoryMap.size} Project Categories.`);

    // Create Projects
    for (const pData of projectsData) {
        await prisma.project.create({
            data: {
                title: pData.title,
                subtitle: pData.subtitle,
                description: pData.description,
                image: pData.image,
                categoryId: categoryMap.get(pData.categoryName)
            }
        });
        console.log(`Created project: ${pData.title}`);
    }

    console.log('Seeding projects pipeline finished successfully.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
