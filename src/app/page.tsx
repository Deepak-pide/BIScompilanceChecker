import { AppLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SplashPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="items-center text-center">
          <AppLogo className="mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">
            Smart BIS Compliance Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 pt-0">
          <p className="mb-6 text-center text-muted-foreground">
            Your AI-powered assistant for navigating Bureau of Indian Standards
            compliance.
          </p>
          <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
            <Link href="/home">
              Get Started
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
