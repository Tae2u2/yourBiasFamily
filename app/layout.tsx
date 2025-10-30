import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '최애족보 - AI로 만드는 나만의 최애 가문',
  description: 'AI가 분석하는 나의 최애들의 공통점과 취향. 중세 귀족 족보 스타일로 기록하세요.',
  keywords: ['최애', '족보', 'AI', 'K-POP', '아이돌', '빈티지'],
  authors: [{ name: 'Choae Jokbo' }],
  openGraph: {
    title: '최애족보 - AI로 만드는 나만의 최애 가문',
    description: 'AI가 분석하는 나의 최애들의 공통점과 취향',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
