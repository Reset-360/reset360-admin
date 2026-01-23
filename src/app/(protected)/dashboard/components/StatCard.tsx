import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  variant?: 'default' | 'low' | 'medium' | 'high';
  className?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
  className,
}: StatCardProps) {
  // const variantStyles = {
  //   default: 'bg-card border-border',
  //   low: 'bg-emerald-300 border-emerald-500',
  //   medium: 'bg-orange-300 border-orange-500',
  //   high: 'bg-red-300 border-red-500',
  // };

  // const iconStyles = {
  //   default: 'bg-secondary text-foreground',
  //   low: 'bg-emerald-500/20 text-risk-low',
  //   medium: 'bg-orange-500/20 text-risk-medium',
  //   high: 'bg-red-500/20 text-risk-high',
  // };

  // const valueStyles = {
  //   default: 'text-foreground',
  //   low: 'text-emerald-900',
  //   medium: 'text-orange-900',
  //   high: 'text-red-900',
  // };

  const variantStyles = {
    default: "bg-card border-border",
    low: "bg-risk-low-bg border-risk-low/30",
    medium: "bg-risk-medium-bg border-risk-medium/30",
    high: "bg-risk-high-bg border-risk-high/30",
  };

  const iconStyles = {
    default: "bg-secondary text-foreground",
    low: "bg-risk-low/20 text-risk-low",
    medium: "bg-risk-medium/20 text-risk-medium",
    high: "bg-risk-high/20 text-risk-high",
  };

  const valueStyles = {
    default: "text-foreground",
    low: "text-risk-low",
    medium: "text-risk-medium",
    high: "text-risk-high",
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn("text-sm font-medium text-muted-foreground", valueStyles[variant])}>{title}</p>
          <p
            className={cn(
              'text-4xl font-bold tracking-tight',
              valueStyles[variant]
            )}
          >
            {value}
          </p>
        </div>
        <div className={cn('rounded-xl p-3', iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
