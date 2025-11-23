import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import NavWrapper from "@/clientWrapper/NavWrapper";
import PageTransition from "@/clientWrapper/TransitionWrapper";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "GenAI Project 01",
  description:
    "A multimodel chat project with streaming and generative UI features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavWrapper />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
