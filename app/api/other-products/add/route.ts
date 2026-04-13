import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, description, image_url, weight } = await req.json();

    if (!name || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO other_products (name, description, image_url, weight) VALUES (?, ?, ?, ?)',
      [name, description, image_url, weight]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to add other product' }, { status: 500 });
  }
}
