import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppHeader from "@/components/common/AppHeader";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIDC Skills Tracker",
  description: "Track your skills and improve your career prospects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="pt-24">
            <AppHeader />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
