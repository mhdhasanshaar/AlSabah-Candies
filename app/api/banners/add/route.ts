import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { banner_url } = await req.json();

    if (!banner_url) {
      return NextResponse.json({ error: 'Missing banner URL' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO banners (banner_url) VALUES (?)',
      [banner_url]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}
