import { Badge } from '../../ui/badge';
import { EPurchaseStatus } from '@/src/types/purchaseTypes';

const purchaseStatusConfig: Record<EPurchaseStatus, { label: string; className: string }> = {
  [EPurchaseStatus.Pending]: {
    label: 'Pending',
    className: 'bg-yellow-500 text-black dark:bg-yellow-400',
  },
  [EPurchaseStatus.Paid]: {
    label: 'Paid',
    className: 'bg-green-500 text-white dark:bg-green-600',
  },
  [EPurchaseStatus.Failed]: {
    label: 'Failed',
    className: 'bg-red-500 text-white dark:bg-red-600',
  },
  [EPurchaseStatus.Expired]: {
    label: 'Expired',
    className: 'bg-gray-500 text-white dark:bg-gray-600',
  },
  [EPurchaseStatus.Cancelled]: {
    label: 'Cancelled',
    className: 'bg-orange-500 text-white dark:bg-orange-600',
  },
};

export function PurchaseStatusBadge({ status }: { status: EPurchaseStatus }) {
  const { label, className } =
    purchaseStatusConfig[status] ?? purchaseStatusConfig[EPurchaseStatus.Pending];

  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  );
}