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
  title: "Mjolnir Design Studios",
  description: "For Midgard!",
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