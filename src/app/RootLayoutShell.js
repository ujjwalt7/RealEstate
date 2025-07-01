"use client";
import LayoutDef from "@/components/Layout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { logEvent } from "@/lib/analytics";

export default function RootLayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) {
      logEvent("page_view", { page: pathname });
    }
  }, [pathname, isAdmin]);

  return isAdmin ? children : <LayoutDef>{children}</LayoutDef>;
} 