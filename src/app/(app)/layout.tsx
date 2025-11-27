import Link from "next/link";
import { Home } from "lucide-react";
import { AppLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-card border-b sticky top-0 z-10 no-print">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/home">
            <AppLogo />
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/home">
              <Home className="mr-2" /> Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">{children}</main>
      <footer className="text-center p-4 text-muted-foreground text-sm no-print">
        © {new Date().getFullYear()} BIS Smart Compliance Checker. All rights
        reserved.
      </footer>
    </div>
  );
}
