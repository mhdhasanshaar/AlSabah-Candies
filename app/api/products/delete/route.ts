import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { id, type } = await req.json();

    if (!id || !type) {
      return NextResponse.json({ error: 'Missing ID or type' }, { status: 400 });
    }

    const table = type === 'main' ? 'products' : 'other_products';
    await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
