import { EGenerationStatus } from '@/src/types/seatBatchTypes';
import { Badge } from '../../ui/badge';

const statusConfig = {
  [EGenerationStatus.Queued]: {
    label: 'Queued',
    className: 'bg-gray-400 text-black dark:bg-gray-500',
  },
  [EGenerationStatus.Generating]: {
    label: 'Generating',
    className: 'bg-blue-500 text-white dark:bg-blue-600',
  },
  [EGenerationStatus.Done]: {
    label: 'Done',
    className: 'bg-green-500 text-white dark:bg-green-600',
  },
  [EGenerationStatus.Failed]: {
    label: 'Failed',
    className: 'bg-red-500 text-white dark:bg-red-600',
  },
};

export function GenerationStatusBadge({ status }: { status: EGenerationStatus }) {
  if (!status) return null;

  const { label, className } =
    statusConfig[status] ?? statusConfig[EGenerationStatus.Queued];

  return (
    <Badge variant="secondary" className={className ?? ''}>
      {label}
    </Badge>
  );
}
