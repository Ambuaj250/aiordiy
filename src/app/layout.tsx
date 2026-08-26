import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const plexmono = IBM_Plex_Mono({
  variable: "--font-plexmono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiordiy.com"),
  title: "aiordiy — AI or DIY? Every task, two ways",
  description:
    "Practical guides that solve everyday tasks two ways: the AI way for speed, the DIY way for craft. Pick a side — or take both.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "aiordiy — AI or DIY? Every task, two ways",
    description:
      "The AI way for speed. The DIY way for craft. Practical guides for home, work, money, and life.",
    url: "/",
    siteName: "aiordiy",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aiordiy",
    creator: "@aiordiy",
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
      className={`${display.variable} ${grotesk.variable} ${plexmono.variable} h-full antialiased`}
    >
      <body className="h-full">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
