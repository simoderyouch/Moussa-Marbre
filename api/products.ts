import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { path } = req.query;
        const slug = Array.isArray(path) ? path[0] : path;

        if (slug) {
            const requestedSlug = slug.toLowerCase();
            const products = await prisma.product.findMany({ include: { category: true } });
            const product = products.find(
                (p) => slugify(p.name) === requestedSlug || p.name.toLowerCase() === requestedSlug
            );
            if (!product) return res.status(404).json({ error: 'Product not found', requestedSlug });
            res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
            return res.json(product);
        }

        const products = await prisma.product.findMany({
            where: { published: true },
            include: { category: true },
        });
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
        return res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
