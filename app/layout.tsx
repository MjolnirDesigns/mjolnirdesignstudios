import type { Metadata } from "next";
import { Geo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientlayout"; // Import new client component

const geo = Geo({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
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
    url: "https://mjolnirdesignstudios.com", // Replace with your actual domain
    siteName: "Mjolnir Design Studios",
    images: [
      {
        url: "/images/mjolnir-preview.jpg", // Replace with your preview image path in /public
        width: 1200,
        height: 630,
        alt: "Mjolnir Design Studios Preview Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mjolnir Design Studios",
    description: "For Midgard!",
    images: ["/images/mjolnir-high-resolution-logo-transparent.png"], // Replace with your preview image path in /public
  },
  icons: {
    icon: "/icons/triquetra_gold_512px.png", // Path to your favicon in /public
    shortcut: "/icons/triquetra_gold_512px.png", // Optional: for shortcut icon
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
        <ClientLayout>{children}</ClientLayout> {/* Wrap with client component */}
      </body>
    </html>
  );
}