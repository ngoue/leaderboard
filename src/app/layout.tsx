import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const CrumblSansFont = localFont({
  variable: "--font-crumbl-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/CrumblSans/Display.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/CrumblSans/TextBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CrumblSans/TextBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/CrumblSans/TextRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CrumblSans/TextRegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/CrumblSans/TextLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/CrumblSans/TextLightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Indisputable evidence of who's the best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${CrumblSansFont.variable} antialiased h-full w-full`}>
        {children}
      </body>
    </html>
  );
}
