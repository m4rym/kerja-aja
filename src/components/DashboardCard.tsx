import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  iconColor?: string;
}

export default function DashboardCard({
  icon: Icon,
  title,
  value,
  description,
  iconColor = 'text-primary',
}: DashboardCardProps) {
  return (
    <Card className="p-4 hover-elevate" data-testid={`card-dashboard-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1" data-testid="text-card-title">
            {title}
          </p>
          <p className="text-2xl font-bold mb-1" data-testid="text-card-value">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground" data-testid="text-card-description">
              {description}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-muted ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
