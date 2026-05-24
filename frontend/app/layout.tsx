// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import React from "react";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter", });

// export const metadata: Metadata = {
//   title: "Shift - Student Gig Economy Platform",
//   description: "Find flexible gigs, connect with employers, and earn on your terms.",
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//     userScalable: true,
//   },
//   themeColor: "#FFFFFF",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   useEffect(() => {
//     // Hydrate auth state from localStorage on client mount
//     useAuthStore.getState().hydrate();
//   }, []);

//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className={`${inter.className} bg-neutral-50 text-neutral-900`}>
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shift - Student Gig Economy Platform",
  description: "Find flexible gigs, connect with employers, and earn on your terms.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: "#FFFFFF",
  manifest: './manifest.json',
  openGraph: {
    title: "Shift - Student Gig Economy Platform",
    description: "Find flexible gigs, connect with employers, and earn on your terms.",
    url: "https://shiftlabs-roan.vercel.app",
    images: [
      {
        url: "https://shiftlabs-roan.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Shift platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift - Student Gig Economy Platform",
    description: "Find flexible gigs, connect with employers, and earn on your terms.",
    images: ["https://shiftlabs-roan.vercel.app/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-50 text-neutral-900`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}