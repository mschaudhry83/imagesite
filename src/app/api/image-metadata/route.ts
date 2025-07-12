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
   20     // You can choose to return specific metadata or all of it.
   21     // For simplicity, we'll return the full metadata object.
   22     return NextResponse.json({ success: true, metadata: metadata });
   23
   24   } catch (error) {
   25     console.error(error);
   26     return NextResponse.json({ error: 'Failed to retrieve image metadata.' }, { status: 500 });
   27   }
   28 }