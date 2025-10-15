import type { Metadata } from "next";
import { Geo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientlayout";

const geo = Geo({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mjolnirdesignstudios.com'),
  title: {
    default: "Mjolnir Design Studios",
    template: "%s | Mjolnir Design Studios",
  },
  description: "For Midgard!",
  keywords: [
    "Design",
    "Digital Design",
    "Hostinger",
    "Mjolnir",
    "Mjolnir Design Studios",
    "Powerful Design",
    "UI Design",
    "UX Design",
    "UI/UX Design",
    "Web Design",
    "Web Design Services",
    "Web Development",
    "Web Development Services",
  ],
  openGraph: {
    title: "Mjolnir Design Studios",
    description: "For Midgard!",
    url: "https://mjolnirdesignstudios.com",
    siteName: "Mjolnir Design Studios",
    images: [
      {
        url: "/Logos/Mjolnir_ElectricBlue47_Thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Mjolnir Design Studios Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mjolnir Design Studios",
    description: "For Midgard!",
    images: ["/Logos/Mjolnir_ElectricBlue47_Thumbnail.png"],
  },
  icons: {
    icon: "/Icons/triquetra_gold_512px.png",
    shortcut: "/Icons/triquetra_gold_512px.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geo.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}