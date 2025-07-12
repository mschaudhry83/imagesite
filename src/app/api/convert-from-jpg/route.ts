

    1 import { NextRequest, NextResponse } from 'next/server';
    2 import sharp from 'sharp';
    3 import path from 'path';
    4 import fs from 'fs/promises';
    5
    6 export async function POST(req: NextRequest) {
    7   try {
    8     const formData = await req.formData();
    9     const file = formData.get('file') as File | null;
   10     const targetFormat = formData.get('targetFormat') as string;
   11
   12     if (!file) {
   13       return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
   14     }
   15
   16     if (!targetFormat || !['png', 'webp'].includes(targetFormat.toLowerCase())) {
   17       return NextResponse.json({ error: 'Invalid target format specified.' }, { status: 400 });
   18     }
   19
   20     // Ensure the uploads directory exists
   21     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
   22     await fs.mkdir(uploadsDir, { recursive: true });
   23
   24     const buffer = Buffer.from(await file.arrayBuffer());
   25     const originalFilename = file.name;
   26     const baseFilename = path.basename(originalFilename, path.extname(originalFilename));
   27
   28     // Define the new filename with the target extension
   29     const newFilename = `${baseFilename}-converted-${Date.now()}.${targetFormat.toLowerCase()}`;
   30     const outputPath = path.join(uploadsDir, newFilename);
   31
   32     let image = sharp(buffer);
   33
   34     switch (targetFormat.toLowerCase()) {
   35       case 'png':
   36         image = image.png(); // Convert to PNG
   37         break;
   38       case 'webp':
   39         image = image.webp({ quality: 90 }); // Convert to WEBP with good quality
   40         break;
   41       default:
   42         // This case should ideally not be reached due to the check above
   43         return NextResponse.json({ error: 'Unsupported target format.' }, { status: 400 });
   44     }
   45
   46     await image.toFile(outputPath);
   47
   48     return NextResponse.json({ success: true, filename: newFilename });
   49
   50   } catch (error) {
   51     console.error(error);
   52     return NextResponse.json({ error: 'Failed to convert image.' }, { status: 500 });
   53   }
   54 }

