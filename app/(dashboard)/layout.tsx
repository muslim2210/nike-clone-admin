import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";
// import { ToasterProvider } from "@/lib/ToasterProvider";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nike - Admin Dashboard",
  description: "Admin dashboard to manage Nike data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ClerkProvider>
          <ToasterProvider />
          <div className="flex max-lg:flex-col text-primaryBlack">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
