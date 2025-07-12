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
   23     const compressedFilename = `${baseFilename}-compressed-${Date.now()}${fileExtension}`;
   24     const outputPath = path.join(uploadsDir, compressedFilename);
   25
   26     let compressionOptions;
   27     switch (fileExtension.toLowerCase()) {
   28       case '.jpeg':
   29       case '.jpg':
   30         compressionOptions = { quality: 80 }; // Adjust quality for JPG
   31         await sharp(buffer).jpeg(compressionOptions).toFile(outputPath);
   32         break;
   33       case '.png':
   34         compressionOptions = { compressionLevel: 8 }; // Adjust compression for PNG
   35         await sharp(buffer).png(compressionOptions).toFile(outputPath);
   36         break;
   37       case '.webp':
   38         compressionOptions = { quality: 80 }; // Adjust quality for WEBP
   39         await sharp(buffer).webp(compressionOptions).toFile(outputPath);
   40         break;
   41       default:
   42         return NextResponse.json({ error: 'Unsupported file type for compression.' }, { status: 400 });
   43     }
   44
   45     return NextResponse.json({ success: true, filename: compressedFilename });
   46
   47   } catch (error) { you have created this file.
   48     console.error(error);
   49     return NextResponse.json({ error: 'Failed to compress image.' }, { status: 500 });
   50   }
   51 }