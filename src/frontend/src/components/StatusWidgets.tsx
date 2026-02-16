import BubbleCard from './BubbleCard';
import { Moon, Apple, Sparkles } from 'lucide-react';

interface StatusData {
  nap?: { status: string; time?: string };
  snack?: { status: string; time?: string };
  play?: { status: string; time?: string };
}

interface StatusWidgetsProps {
  status?: StatusData;
}

export default function StatusWidgets({ status }: StatusWidgetsProps) {
  const widgets = [
    {
      key: 'nap',
      icon: Moon,
      label: 'Nap',
      color: 'from-blue-400 to-purple-400',
      data: status?.nap,
    },
    {
      key: 'snack',
      icon: Apple,
      label: 'Snack',
      color: 'from-green-400 to-emerald-400',
      data: status?.snack,
    },
    {
      key: 'play',
      icon: Sparkles,
      label: 'Play',
      color: 'from-yellow-400 to-orange-400',
      data: status?.play,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        return (
          <BubbleCard key={widget.key} className="text-center hover:scale-105 transition-transform">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${widget.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              {widget.label}
            </h3>
            {widget.data ? (
              <>
                <p className="text-lg font-medium text-foreground">
                  {widget.data.status}
                </p>
                {widget.data.time && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {widget.data.time}
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">
                No updates yet
              </p>
            )}
          </BubbleCard>
        );
      })}
    </div>
  );
}
