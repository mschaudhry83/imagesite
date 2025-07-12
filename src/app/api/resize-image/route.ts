 1 import { NextRequest, NextResponse } from 'next/server';
    2 import sharp from 'sharp';
    3 import path from 'path';
    4 import fs from 'fs/promises';
    5
    6 export async function POST(req: NextRequest) {
    7   try {
    8     const formData = await req.formData();
    9     const file = formData.get('file') as File | null;
   10     const widthStr = formData.get('width') as string;
   11     const heightStr = formData.get('height') as string;
   12
   13     if (!file) {
   14       return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
   15     }
   16
   17     const width = widthStr ? parseInt(widthStr, 10) : undefined;
   18     const height = heightStr ? parseInt(heightStr, 10) : undefined;
   19
   20     if ((!width && !height) || (width !== undefined && isNaN(width)) || (height !== undefined && isNaN(height))) {
   21       return NextResponse.json({ error: 'Invalid width or height provided.' }, { status: 400 });
   22     }
   23
   24     // Ensure the uploads directory exists
   25     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
   26     await fs.mkdir(uploadsDir, { recursive: true });
   27
   28     const buffer = Buffer.from(await file.arrayBuffer());
   29     const originalFilename = file.name;
   30     const fileExtension = path.extname(originalFilename);
   31     const baseFilename = path.basename(originalFilename, fileExtension);
   32
   33     const resizedFilename = `${baseFilename}-resized-${Date.now()}${fileExtension}`;
   34     const outputPath = path.join(uploadsDir, resizedFilename);
   35
   36     let image = sharp(buffer);
   37
   38     // Resize the image. If only one dimension is provided, sharp maintains aspect ratio.
   39     await image.resize(width, height).toFile(outputPath);
   40
   41     return NextResponse.json({ success: true, filename: resizedFilename });
   42
   43   } catch (error) {
   44     console.error(error);
   45     return NextResponse.json({ error: 'Failed to resize image.' }, { status: 500 });
   46   }
   47 }