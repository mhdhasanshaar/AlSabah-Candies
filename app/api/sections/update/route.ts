import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { slug, title, subtitle, description, image_url } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Missing section slug' }, { status: 400 });
    }

    // Check if section exists
    const [existing] = await pool.query('SELECT id FROM sections WHERE slug = ?', [slug]);
    
    if ((existing as any[]).length > 0) {
      await pool.query(
        'UPDATE sections SET title = ?, subtitle = ?, description = ?, image_url = ? WHERE slug = ?',
        [title, subtitle, description, image_url, slug]
      );
    } else {
      await pool.query(
        'INSERT INTO sections (slug, title, subtitle, description, image_url) VALUES (?, ?, ?, ?, ?)',
        [slug, title, subtitle, description, image_url]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}
