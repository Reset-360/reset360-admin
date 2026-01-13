import { Badge } from '../../ui/badge';
import { ERiskBand } from '@/src/types/assessmentTypes';

const riskConfig = {
  [ERiskBand.low]: {
    label: 'Low Risk',
    className: 'bg-green-500 text-white dark:bg-green-600',
  },
  [ERiskBand.moderate]: {
    label: 'Moderate Risk',
    className: 'bg-orange-500 text-white dark:bg-orange-600',
  },
  [ERiskBand.high]: {
    label: 'High Risk',
    className: 'bg-red-500 text-white dark:bg-red-600',
  },
};

export function RiskBandBadge({ riskBand }: { riskBand: ERiskBand }) {
  const { label, className } =
    riskConfig[riskBand] ?? riskConfig[ERiskBand.low];

  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  );
}
