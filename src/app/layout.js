"use client";
import "./globals.css";
import LayoutDef from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import NavigationProgress from "@/components/NavigationProgress";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { logEvent } from "@/lib/analytics";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) {
      logEvent("page_view", { page: pathname });
    }
  }, [pathname, isAdmin]);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isAdmin ? (
          children
        ) : (
          <LayoutDef>
            {children}
          </LayoutDef>
        )}
      </body>
    </html>
  );
}
