import { Badge } from '../../ui/badge';
import { ESeatCodeStatus } from '@/src/types/seatCodeTypes';

const statusConfig = {
  [ESeatCodeStatus.UNUSED]: {
    label: 'Unused',
    className: 'border-neutral-800',
  },
  [ESeatCodeStatus.REDEEMED]: {
    label: 'Redeemed',
    className: 'border-green-500 text-green-500',
  },
  [ESeatCodeStatus.EXPIRED]: {
    label: 'Expired',
    className: 'border-red-500 text-red-500',
  }
};

export function SeatCodeStatusLabel({ status }: { status: ESeatCodeStatus }) {
  const { label, className } = 
    statusConfig[status] ?? statusConfig[ESeatCodeStatus.UNUSED];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
