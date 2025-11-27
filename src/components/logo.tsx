import { cn } from "@/lib/utils";

const BisLogo = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-12 h-12", className)}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" />
    <path
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50"
      stroke="hsl(var(--accent))"
      strokeWidth="8"
    />
    <path d="M30 50H70" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <path d="M50 30V70" stroke="white" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BisLogo className="w-10 h-10" />
      <span className="text-xl font-bold tracking-tight text-primary">
        BIS Smart Checker
      </span>
    </div>
  );
};
