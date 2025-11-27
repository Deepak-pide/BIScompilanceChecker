import { AiLogo, AppLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <AppLogo className="mb-2" />
          <div className="absolute -top-1 -right-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#FF9900" />
              <path
                d="M5.5 10.5L8.5 13.5L14.5 7.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mb-4">
          <AiLogo />
          <p className="text-sm text-foreground/80">AI-Powered</p>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-normal mb-8">
          Smart BIS
          <br />
          Compliance Checker
        </h1>
        <Button
          asChild
          size="lg"
          className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <Link href="/home">
            Get Started
          </Link>
        </Button>
      </div>
    </main>
  );
}
