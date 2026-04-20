import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '모바일 청첩장 · 허재 ♡ 오지희',
  description: '2026년 8월 29일 토요일 오후 2시 20분',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Noto+Serif+KR:wght@300;400;600&family=Parisienne:wght@400&family=Dancing+Script:wght@400;600&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, height: '100%' }}>
        {children}
      </body>
    </html>
  );
}
