import { Badge } from '../../ui/badge';
import { EAssessmentType } from '@/src/types/assessmentTypes';

const typeConfig = {
  [EAssessmentType.ADAPTS_S]: {
    label: 'ADAPTS-S',
    className: 'bg-primary text-white',
  },
  [EAssessmentType.ADAPTS_T]: {
    label: 'ADAPTS-T',
    className: 'bg-orange-500 text-white dark:bg-orange-600',
  },
  [EAssessmentType.ADAPTS_P]: {
    label: 'ADAPTS-P',
    className: 'bg-blue-500 text-white dark:bg-blue-600',
  },
  [EAssessmentType.ADAPTS_C]: {
    label: 'ADAPTS-C',
    className: 'bg-yellow-500 text-black dark:bg-yellow-400',
  },
};

export function AdaptsTypeBadge({ type }: { type: EAssessmentType }) {
  const { label, className } =
    typeConfig[type] ?? typeConfig[EAssessmentType.ADAPTS_S];

  if (!type) return
  
  return (
    <Badge variant="secondary" className={className ?? ''}>
      {label}
    </Badge>
  );
}
