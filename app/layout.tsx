import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sfCompactDisplay = localFont({
  src: [
    {
      path: "../fonts/sf-compact-display-cufonfonts-webfont/sf-compact-display-thin-58646eb43a785.woff",
      weight: "100",
    },
    {
      path: "../fonts/sf-compact-display-cufonfonts-webfont/sf-compact-display-medium-5864711817c30.woff",
      weight: "500",
    },
  ],
  variable: "--font-sf-compact",
});

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "Current weather and 3-day forecast powered by WeatherAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sfCompactDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
