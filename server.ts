import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static images from the data directory
app.use('/api/images', express.static(path.join(__dirname, 'data')));

// Get all products
app.get('/api/products', async (req: express.Request, res: express.Response) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                published: true,
            },
            include: {
                category: true,
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});
