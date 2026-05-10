import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import 'leaflet/dist/leaflet.css';

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
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Nanum+Myeongjo:wght@400;700&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Noto+Serif+KR:wght@300;400;600&family=Noto+Sans+KR:wght@400;500&family=Parisienne:wght@400&family=Dancing+Script:wght@400;600&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, height: '100%' }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
