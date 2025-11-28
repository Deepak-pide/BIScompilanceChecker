import { cn } from "@/lib/utils";
import Image from "next/image";

const BisLogo = ({ className }: { className?: string }) => (
  <Image
    src="/BIS.png"
    alt="BIS Logo"
    width={80}
    height={80}
    className={cn("w-20 h-20", className)}
  />
);

export const AiLogo = ({ className }: { className?: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 6L8 42H14.5L17.5 34H30.5L33.5 42H40L24 6ZM19.5 28L24 16L28.5 28H19.5Z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M30.5 34H32.5L31.5 36.5H29.5L30.5 34Z"
      fill="hsl(var(--accent))"
    />
    <path d="M28.5 38H30.5L29.5 40.5H27.5L28.5 38Z" fill="hsl(var(--accent))" />
    <path d="M26.5 34H28.5L27.5 36.5H25.5L26.5 34Z" fill="hsl(var(--accent))" />
    <path d="M24.5 38H26.5L25.5 40.5H23.5L24.5 38Z" fill="hsl(var(--accent))" />
    <path d="M22.5 34H24.5L23.5 36.5H21.5L22.5 34Z" fill="hsl(var(--accent))" />
    <path d="M20.5 38H22.5L21.5 40.5H19.5L20.5 38Z" fill="hsl(var(--accent))" />
    <path d="M18.5 34H20.5L19.5 36.5H17.5L18.5 34Z" fill="hsl(var(--accent))" />
  </svg>
);

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BisLogo />
    </div>
  );
};
