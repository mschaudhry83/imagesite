
    1 import type { Metadata } from "next";
    2 import { Inter } from "next/font/google";
    3 import "./globals.css";
    4 import Script from 'next/script'; // Import Script component for Google Analytics
    5
    6 const inter = Inter({ subsets: ["latin"] });
    7
    8 export const metadata: Metadata = {
    9   title: "EditCompressImage.com - Free Online Image Tools",
   10   description: "A complete suite of free online image tools. Compress, resize, crop, convert, and edit your images easily and professionally.",
   11   keywords: "image compressor, image resizer, image converter, jpg converter, png converter, background remover, crop image, edit image",
   12 };
   13
   14 export default function RootLayout({
   15   children,
   16 }: Readonly<{
   17   children: React.ReactNode;
   18 }>) {
   19   return (
   20     <html lang="en">
   21       <head>
   22         {/* Google Analytics Placeholder - Replace G-XXXXXXXXXX with your actual Measurement ID */}
   23         <Script
   24           src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
   25           strategy="afterInteractive"
   26         />
   27         <Script id="google-analytics" strategy="afterInteractive">
   28           {`
   29             window.dataLayer = window.dataLayer || [];
   30             function gtag(){dataLayer.push(arguments);}
   31             gtag('js', new Date());
   32             gtag('config', 'G-XXXXXXXXXX');
   33           `}
   34         </Script>
   35       </head>
   36       <body className={inter.className}>{children}</body>
   37     </html>
   38   );
   39 }