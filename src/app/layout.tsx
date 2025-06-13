import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LoadingProvider } from "@/context/Loading";
import { ThemeProvider } from "@/components/Theme-Provider/theme-provider";
import { SmoothScrollProvider } from "@/components/Smooth-Scroll/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LazyStack - The Ultimate Developer Tools Collection",
  description:
    "LazyStack - The Ultimate Developer Tools Collection. A curated suite of powerful development tools, design resources, and AI utilities to supercharge your workflow. Built with Next.js, Tailwind CSS, and TypeScript to help developers build beautiful, responsive applications with minimal effort. Designed to eliminate boilerplate code and streamline your development process.",
  icons: {
    icon: "../src/app/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <SmoothScrollProvider />
            {children}
            <TempoInit />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
