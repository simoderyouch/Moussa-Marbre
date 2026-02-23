import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const projects = await prisma.project.findMany({
            where: { published: true },
            include: { category: true },
            orderBy: { id: 'asc' },
        });
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
        return res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
