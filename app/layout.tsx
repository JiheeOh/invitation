import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Nanum_Myeongjo, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import KakaoInit from '@/components/KakaoInit';
import 'leaflet/dist/leaflet.css';

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-nanum-myeongjo',
  preload: false,
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['300', '400', '600'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
  preload: false,
});

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
  preload: false,
});

export const metadata: Metadata = {
  title: '모바일 청첩장 · 허재 ♡ 오지희',
  description: '2026년 8월 29일 토요일 오후 2시 20분',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`h-full ${cormorant.variable} ${nanumMyeongjo.variable} ${notoSerifKr.variable} ${notoSansKr.variable}`}>
      <body style={{ margin: 0, padding: 0, height: '100%' }}>
        <KakaoInit />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
