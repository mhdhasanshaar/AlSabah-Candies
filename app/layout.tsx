import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';

const itfRayatar = localFont({
  src: [
    {
      path: '../public/fonts/ITFRAYATAR-LIGHT.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/ITFRAYATAR-REGULAR.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ITFRAYATAR-MEDIUM.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/ITFRAYATAR-BOLD.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/ITFRAYATAR-BLACK.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-itf-rayatar',
});

export const metadata: Metadata = {
  title: 'سكاكر الصباح | منذ 1947',
  description: 'موقع إلكتروني حديث وفاخر لعلامة تجارية رائدة في صناعة الحلويات.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={itfRayatar.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
