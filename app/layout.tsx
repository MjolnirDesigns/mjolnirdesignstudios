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