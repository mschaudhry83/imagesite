 1 import { NextRequest, NextResponse } from 'next/server';
    2 import sharp from 'sharp';
    3 import path from 'path';
    4 import fs from 'fs/promises';
    5
    6 export async function POST(req: NextRequest) {
    7   try {
    8     const formData = await req.formData();
    9     const file = formData.get('file') as File | null;
   10
   11     if (!file) {
   12       return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
   13     }
   14
   15     // Ensure the uploads directory exists
   16     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
   17     await fs.mkdir(uploadsDir, { recursive: true });
   18
   19     const buffer = Buffer.from(await file.arrayBuffer());
   20     const originalFilename = file.name;
   21     const baseFilename = path.basename(originalFilename, path.extname(originalFilename));
   22
   23     // Define the new filename with a .jpg extension
   24     const newFilename = `${baseFilename}-converted-${Date.now()}.jpg`;
   25     const outputPath = path.join(uploadsDir, newFilename);
   26
   27     // Use sharp to convert the image to JPG
   28     await sharp(buffer)
   29       .jpeg({
   30         quality: 90, // You can adjust the quality
   31         chromaSubsampling: '4:4:4' // Use high-quality subsampling
   32       })
   33       .toFile(outputPath);
   34
   35     return NextResponse.json({ success: true, filename: newFilename });
   36
   37   } catch (error) {
   38     console.error(error);
   39     return NextResponse.json({ error: 'Failed to convert image.' }, { status: 500 });
   40   }
   41 }
