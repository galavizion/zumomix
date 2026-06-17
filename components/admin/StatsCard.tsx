import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatsCard({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-card border border-neutral-200 p-5 shadow-card flex items-start gap-4">
      <div className="w-11 h-11 rounded-card bg-brand-green-light flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-brand-green" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-display font-bold text-neutral-900 mt-1">{value}</p>
        {subtitle && (
          <p className={`text-xs mt-1 ${trend === "up" ? "text-brand-green" : trend === "down" ? "text-red-500" : "text-neutral-500"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
