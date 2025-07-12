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
   15     const buffer = Buffer.from(await file.arrayBuffer());
   16
   17     // Use sharp to get image metadata
   18     const metadata = await sharp(buffer).metadata();
   19
   20     // Prepare the information to send back to the frontend
   21     const imageInfo = {
   22       name: file.name,
   23       type: file.type,
   24       size: file.size,
   25       width: metadata.width,
   26       height: metadata.height,
   27       format: metadata.format,
   28       channels: metadata.channels,
   29       space: metadata.space,
   30       density: metadata.density,
   31       hasAlpha: metadata.hasAlpha,
   32       isProgressive: metadata.isProgressive,
   33       // Add more properties from metadata as needed
   34     };
   35
   36     return NextResponse.json({ success: true, info: imageInfo });
   37
   38   } catch (error) {
   39     console.error(error);
   40     return NextResponse.json({ error: 'Failed to retrieve image information.' }, { status: 500 });
   41   }
   42 }