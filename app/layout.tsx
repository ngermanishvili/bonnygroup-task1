"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import ExampleNavbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <ExampleNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
