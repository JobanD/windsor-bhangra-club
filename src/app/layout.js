import React, { Suspense } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeRegistry from "../../styles/ThemeRegistry";

// components
import LoadingPage from "@/components/LoadingPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Windsor Bhangra Club" />
        <title>IPCHAS</title>
        <link rel="preload" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: "mui-theme" }}>
            <Navbar />
            <Suspense fallback={<LoadingPage />}>{children}</Suspense>
            <Footer />
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
