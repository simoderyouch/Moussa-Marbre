import fs from 'fs';
import path from 'path';
import heicDecode from 'heic-decode';
import jpeg from 'jpeg-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const dir = path.join(process.cwd(), 'projects');

async function convertFile(filename: string) {
    const filePath = path.join(dir, filename);
    const jpgFileName = filename.replace(/\.(heic|HEIC)$/, '.jpg');
    const jpgFilePath = path.join(dir, jpgFileName);

    try {
        console.log(`Converting ${filename} to ${jpgFileName}...`);
        const buffer = fs.readFileSync(filePath);
        const { width, height, data } = await heicDecode({ buffer });

        const rawImageData = {
            data: data,
            width: width,
            height: height
        };

        const jpegImageData = jpeg.encode(rawImageData, 85); // 85% quality for web optimization
        fs.writeFileSync(jpgFilePath, jpegImageData.data);

        // Update database to point to the new JPG
        const oldUrl = `/api/projects-images/${filename}`;
        const newUrl = `/api/projects-images/${jpgFileName}`;

        await prisma.project.updateMany({
            where: { image: oldUrl },
            data: { image: newUrl }
        });

        // Delete the original HEIC
        fs.unlinkSync(filePath);
        console.log(`[OK] Successfully generated ${jpgFileName}`);

    } catch (err) {
        console.error(`[ERROR] Failed to convert ${filename}:`, err);
    }
}

async function main() {
    console.log('Scanning for .HEIC files...');
    const files = fs.readdirSync(dir);
    const heicFiles = files.filter(f => f.toLowerCase().endsWith('.heic'));

    console.log(`Found ${heicFiles.length} HEIC files to convert.`);

    // Process sequentially to prevent OOM
    for (const file of heicFiles) {
        await convertFile(file);
    }

    console.log('Conversion pipeline complete.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
