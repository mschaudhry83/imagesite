
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
   21     const fileExtension = path.extname(originalFilename);
   22     const baseFilename = path.basename(originalFilename, fileExtension);
   23     const compressedFilename = `${baseFilename}-converted-${Date.now()}.jpg`; // Changed to .jpg for consistency
   24     const outputPath = path.join(uploadsDir, compressedFilename);
   25
   26     await sharp(buffer)
   27       .jpeg({
   28         quality: 90, // You can adjust the quality
   29         chromaSubsampling: '4:4:4' // Use high-quality subsampling
   30       })
   31       .toFile(outputPath);
   32
   33     return NextResponse.json({ success: true, filename: compressedFilename });
   34
   35   } catch (error) {
   36     console.error(error);
   37     return NextResponse.json({ error: 'Failed to convert image.' }, { status: 500 });
   38   }
   39 }