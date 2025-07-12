

    1 import { NextRequest, NextResponse } from 'next/server';
    2 import sharp from 'sharp';
    3 import path from 'path';
    4 import fs from 'fs/promises';
    5
    6 export async function POST(req: NextRequest) {
    7   try {
    8     const formData = await req.formData();
    9     const file = formData.get('file') as File | null;
   10     const xStr = formData.get('x') as string;
   11     const yStr = formData.get('y') as string;
   12     const widthStr = formData.get('width') as string;
   13     const heightStr = formData.get('height') as string;
   14
   15     if (!file) {
   16       return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
   17     }
   18
   19     const x = parseInt(xStr, 10);
   20     const y = parseInt(yStr, 10);
   21     const width = parseInt(widthStr, 10);
   22     const height = parseInt(heightStr, 10);
   23
   24     if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height) || x < 0 || y < 0 || width <= 0 || height <= 0) {
   25       return NextResponse.json({ error: 'Invalid crop coordinates provided. Please ensure x, y, width, and height are positive numbers.' }, { status: 400 });
   26     }
   27
   28     // Ensure the uploads directory exists
   29     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
   30     await fs.mkdir(uploadsDir, { recursive: true });
   31
   32     const buffer = Buffer.from(await file.arrayBuffer()); // Corrected: arrayBuffer()
   33     const originalFilename = file.name;
   34     const fileExtension = path.extname(originalFilename);
   35     const baseFilename = path.basename(originalFilename, fileExtension);
   36
   37     const croppedFilename = `${baseFilename}-cropped-${Date.now()}${fileExtension}`;
   38     const outputPath = path.join(uploadsDir, croppedFilename);
   39
   40     await sharp(buffer)
   41       .extract({ left: x, top: y, width: width, height: height })
   42       .toFile(outputPath);
   43
   44     return NextResponse.json({ success: true, filename: croppedFilename });
   45
   46   } catch (error) {
   47     console.error(error);
   48     return NextResponse.json({ error: 'Failed to crop image.' }, { status: 500 });
   49   }
   50 }