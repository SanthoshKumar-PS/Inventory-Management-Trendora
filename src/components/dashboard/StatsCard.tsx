import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
}
const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) => {
  const variantStyles = {
    default: "text-blue-500",
    success: "text-green-500",
    warning: "text-red-500",
    destructive: "text-gray-500",
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          {/* Left side: Title, value, trend */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </p>
            )}
          </div>

          {/* Right side: Icon */}
          <div className={cn("p-3 rounded-lg", variantStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
