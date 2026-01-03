import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nobel Hands - Feed the Hungry | Donate from ₹2",
  description: "Nobel Hands is a platform dedicated to ending hunger. Even ₹2 can make a difference. Join us in ensuring no one sleeps hungry. 100% of donations go directly to feeding those in need.",
  keywords: ["charity", "donation", "hunger", "feed the hungry", "India", "Nobel Hands", "donate food", "help poor"],
  authors: [{ name: "Nobel Hands" }],
  openGraph: {
    title: "Nobel Hands - Feed the Hungry",
    description: "Even ₹2 can make a difference. Join us in ensuring no one sleeps hungry.",
    type: "website",
    locale: "en_IN",
    siteName: "Nobel Hands",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobel Hands - Feed the Hungry",
    description: "Even ₹2 can make a difference. Join us in ensuring no one sleeps hungry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

