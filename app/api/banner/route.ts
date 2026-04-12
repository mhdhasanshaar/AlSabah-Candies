import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/store';

export async function GET() {
  const data = getStoreData();
  return NextResponse.json({ banner: data.banner });
}

export async function POST(request: Request) {
  const { banner } = await request.json();
  const data = getStoreData();
  
  data.banner = banner;
  saveStoreData(data);
  
  return NextResponse.json({ banner: data.banner });
}
