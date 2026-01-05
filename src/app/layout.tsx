import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavWrapper from "@/clientWrapper/NavWrapper";
import PageTransition from "@/clientWrapper/TransitionWrapper";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import SnowfallWrapper from "@/clientWrapper/SnowfallWrapper";
import MigrationBanner from "@/components/MigrationBanner";

export const metadata: Metadata = {
  title: "Study-toolkit",
  description:
    "Building a platform with a bunch of AI agents and tools that helps students in their academics.",
  openGraph: {
    title: "Study-toolkit",
    description:
      "Building a platform with a bunch of AI agents and tools that helps students in their academics.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" richColors />
          <NavWrapper />
          <MigrationBanner />
          <SnowfallWrapper />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
