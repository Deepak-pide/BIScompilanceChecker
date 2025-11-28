import Link from 'next/link';
import { Home } from 'lucide-react';
import { AppLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <header className="bg-card border-b sticky top-0 z-10 no-print">
        <div className="container mx-auto flex items-center justify-between p-2">
          <Link href="/home">
            <AppLogo className="w-16 h-16" />
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/home">
              <Home className="mr-2" /> Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8 flex">
        <div className="w-full">{children}</div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm no-print bg-transparent">
        © {new Date().getFullYear()} BIS Smart Compliance Checker. All rights
        reserved.
      </footer>
    </div>
  );
}
