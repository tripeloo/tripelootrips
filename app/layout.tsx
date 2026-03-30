import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsAppGlobalButton } from "@/components/WhatsAppGlobalButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tripelootrips.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tripeloo Trips — Tour packages & vacations | South India travel experts",
    template: "%s | Tripeloo Trips",
  },
  description:
    "Tripeloo Trips offers curated tour packages and vacations for travellers from South India — domestic getaways and international holidays with transparent pricing, human support, and hand-picked stays.",
  keywords: [
    "Tripeloo Trips",
    "tour packages",
    "vacations",
    "South India travel",
    "Chennai travel agency",
    "Bengaluru tour packages",
    "Hyderabad holidays",
    "Kerala tour packages",
    "international tour packages from India",
    "domestic tour packages",
    "honeymoon packages",
    "family vacation India",
  ],
  authors: [{ name: "Tripeloo Trips" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Tripeloo Trips",
    title: "Tripeloo Trips — Tour packages & vacations",
    description:
      "Curated domestic and international tour packages for travellers from South India. Search destinations, compare trips, and enquire in minutes.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Tripeloo Trips — travel experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripeloo Trips — Tour packages & vacations",
    description:
      "Curated domestic and international tour packages with support from enquiry to return.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-landing-canvas text-slate-900 overflow-x-clip`}
        style={
          {
            "--font-display": "var(--font-geist-sans)",
          } as React.CSSProperties
        }
      >
        {children}
        <WhatsAppGlobalButton />
      </body>
    </html>
  );
}
