import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  verification: {
    google: "ca-pub-3751979321387142",
  },
  title: "최애족보 - AI로 만드는 나만의 최애 가문",
  description:
    "AI가 분석하는 나의 최애들의 공통점과 취향. 중세 귀족 족보 스타일로 기록하세요.",
  keywords: ["최애", "트위터놀이", "핑크블러드", "아이돌", "위시", "킥플립"],
  authors: [{ name: "Choae Jokbo" }],
  openGraph: {
    title: "최애족보 - 내 최애 역사를 소개할게",
    description:
      "최애 역사를 가계도로 만들고, AI로 최애들의 공통점을 분석하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3751979321387142"
        crossOrigin="anonymous"
      />
      <body>{children}</body>
    </html>
  );
}
