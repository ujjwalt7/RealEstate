"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/call-requests", label: "Call Requests" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!ignore) {
        setSession(data.session);
        setLoading(false);
        if (!data.session) {
          router.replace("/admin/login");
        }
      }
    }
    checkSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.replace("/admin/login");
      }
    });
    return () => {
      ignore = true;
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentYellow"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">Admin</div>
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-6 py-2 rounded transition-colors hover:bg-gray-100",
                    pathname === link.href ? "bg-gray-100 font-semibold" : ""
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Mobile Sidebar */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10 flex justify-around py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex-1 text-center py-2 rounded transition-colors hover:bg-gray-100",
              pathname === link.href ? "bg-gray-100 font-semibold" : ""
            )}
          >
            {link.label}
          </Link>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center px-6 font-semibold text-lg sticky top-0 z-10 justify-between">
          <span>Admin Dashboard</span>
          {session && (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </header>
        <div className="flex-1 p-6 pt-4">{children}</div>
      </main>
    </div>
  );
} 