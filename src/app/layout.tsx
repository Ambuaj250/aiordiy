import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aiordiy — AI or DIY? Every task, two ways",
  description:
    "Practical guides that solve everyday tasks two ways: the AI way for speed, the DIY way for craft. Plus AI agents and automation systems, built in public.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "aiordiy — AI or DIY? Every task, two ways",
    description:
      "The AI way for speed. The DIY way for craft. Practical guides for home, work, money, and life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-16">
        <Header />
        {children}
      </body>
    </html>
  );
}
