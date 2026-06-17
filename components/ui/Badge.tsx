import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "yellow" | "red" | "blue" | "gray";
  className?: string;
}

export default function Badge({ children, variant = "gray", className }: BadgeProps) {
  const variants = {
    green: "bg-brand-green-light text-brand-green-dark",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-700",
    gray: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
