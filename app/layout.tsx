import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

const inter = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "react-hot-toast";
// import { Toaster as SoonerToaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "SmartSchool",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <SoonerToaster richColors /> */}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </body>
    </html>
  );
}
