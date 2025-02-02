import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs';
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note AI",
  description: "Notebook with AI support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </html>
    </ClerkProvider>

  );
}
