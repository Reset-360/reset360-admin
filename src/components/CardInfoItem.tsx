import { CheckCircle2 } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  small?: boolean;
  status?: 'success' | 'default';
}

const ScoreCard = ({
  label,
  value,
  highlight,
  small,
  status,
}: ScoreCardProps) => (
  <div className="text-center">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p
      className={`font-display font-bold ${
        highlight
          ? 'text-2xl text-primary'
          : small
          ? `text-xs ${
              status === 'success' ? 'text-success' : 'text-foreground'
            }`
          : 'text-xl text-foreground'
      } ${
        status === 'success' ? 'flex items-center justify-center gap-1' : ''
      }`}
    >
      {status === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
      {value}
    </p>
  </div>
);

export default ScoreCard;
