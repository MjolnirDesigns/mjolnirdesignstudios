import type { Metadata } from "next";
import { Geo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const geo = Geo ({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic']
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
