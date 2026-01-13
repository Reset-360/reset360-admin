import { EClientSegment } from '@/src/types/clientTypes';
import { Badge } from '../../ui/badge';

const segmentConfig = {
  [EClientSegment.STUDENT]: {
    label: 'Student',
    className: 'bg-primary text-white',
  },
  [EClientSegment.TEACHER]: {
    label: 'Teacher',
    className: 'bg-orange-500 text-white dark:bg-orange-600',
  },
  [EClientSegment.PARENT]: {
    label: 'Parent',
    className: 'bg-blue-500 text-white dark:bg-blue-600',
  },
  [EClientSegment.INDIVIDUAL]: {
    label: 'Young Adult',
    className: 'bg-yellow-500 text-black dark:bg-yellow-400',
  },
};

export function SegmentBadge({ segment }: { segment: EClientSegment }) {
  const { label, className } =
    segmentConfig[segment] ?? segmentConfig[EClientSegment.STUDENT];

  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  );
}
