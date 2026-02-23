import { PrismaClient } from '@prisma/client';
import path from 'path';

// Singleton pattern for Prisma in serverless environments
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// On Vercel, the bundled dev.db is at the project root relative to the function
// The DATABASE_URL env var should be set to: file:./prisma/dev.db
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
