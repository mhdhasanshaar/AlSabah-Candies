import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM sections');
    const sections = (rows as any[]).reduce((acc, section) => {
      acc[section.slug] = section;
      return acc;
    }, {});

    // Fallback for 'about' section if not in DB
    if (!sections.about) {
      sections.about = {
        title: 'نصنع ذكريات حلوة منذ 1947',
        subtitle: 'تراثنا',
        description: 'تأسست شركة سكاكر الصباح في دمشق عام 1947 وتعد من أول وأعرق الشركات في صناعة السكاكر والكراميل. تمتلك الشركة خبرة طويلة وسمعة مميزة في الأسواق المحلية والإقليمية، وتقدم تشكيلة واسعة وفاخرة من النكهات المتعددة لتناسب مختلف الأذواق. نلتزم دائماً بالجودة العالية والمذاق الأصيل.',
        image_url: '/Materials/post-new.png'
      };
    }

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}
