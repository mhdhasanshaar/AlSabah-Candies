import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'سكاكر الصباح | منذ 1947',
  description: 'موقع إلكتروني حديث وفاخر لعلامة تجارية رائدة في صناعة الحلويات.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
