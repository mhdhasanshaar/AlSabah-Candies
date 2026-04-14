import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables are missing');
      return NextResponse.json({ error: 'Cloudinary is not configured on the server' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('image') as File;
    const type = formData.get('type') as string; // products, sections, banners

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<NextResponse>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `alsabah/${type || 'general'}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error details:', error);
            resolve(NextResponse.json({ 
              error: 'Upload failed', 
              details: error.message || 'Unknown Cloudinary error' 
            }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ success: true, url: result?.secure_url }));
          }
        }
      );
      
      uploadStream.end(buffer);
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
