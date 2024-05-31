import React, { Suspense } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

// components
import LoadingPage from "@/components/LoadingPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "IPCHAS - Windsor Bhangra Club",
  description:
    "IPCHAS and WBC are charity organizations in Windsor, Ontario, Canada, promoting Punjabi/Sikhi culture, community involvement, and providing Bhangra classes.",
  keywords:
    "IPCHAS, WBC, Windsor Bhangra Club, charity, Punjabi culture, Sikhi culture, community involvement, Windsor, Ontario, Canada, Bhangra classes",
  openGraph: {
    title: "IPCHAS - Windsor Bhangra Club",
    description:
      "IPCHAS and WBC are charity organizations in Windsor, Ontario, Canada, promoting Punjabi/Sikhi culture, community involvement, and providing Bhangra classes.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "IPCHAS - Windsor Bhangra Club",
      },
    ],
    url: "https://www.windsorbhangraclub.com",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>IPCHAS - Windsor Bhangra Club</title>
      </head>
      <body className={font.className}>
        <ToastProvider>
          <Navbar />
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
          <Toaster />
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
