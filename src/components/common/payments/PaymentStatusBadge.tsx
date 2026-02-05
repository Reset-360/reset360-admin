import { EPaymentStatus } from '@/src/types/paymentTypes';
import { Badge } from '../../ui/badge';

const statusConfig: Record<EPaymentStatus, { label: string; className: string }> = {
  [EPaymentStatus.Pending]: {
    label: 'Pending',
    className: 'bg-yellow-500 text-black dark:bg-yellow-400',
  },
  [EPaymentStatus.Paid]: {
    label: 'Paid',
    className: 'bg-green-500 text-white dark:bg-green-600',
  },
  [EPaymentStatus.Failed]: {
    label: 'Failed',
    className: 'bg-red-500 text-white dark:bg-red-600',
  },
  [EPaymentStatus.Voided]: {
    label: 'Voided',
    className: 'bg-gray-500 text-white dark:bg-gray-600',
  },
  [EPaymentStatus.Refunded]: {
    label: 'Refunded',
    className: 'bg-blue-500 text-white dark:bg-blue-600',
  },
};

export function PaymentStatusBadge({ status }: { status: EPaymentStatus }) {
  const { label, className } =
    statusConfig[status] ?? statusConfig[EPaymentStatus.Pending];

  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  );
}