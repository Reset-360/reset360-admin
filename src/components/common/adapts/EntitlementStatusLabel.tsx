import { EEntitlementStatus } from '@/src/types/entitlementTypes';

const statusConfig = {
  [EEntitlementStatus.AVAILABLE]: {
    label: 'Available',
    className: 'text-green-500  text-sm',
  },
  [EEntitlementStatus.CONSUMED]: {
    label: 'Consumed',
    className: 'text-cyan-500  text-sm',
  },
  [EEntitlementStatus.EXPIRED]: {
    label: 'Expired',
    className: 'text-red-500  text-sm',
  },
  [EEntitlementStatus.IN_USE]: {
    label: 'In Use',
    className: 'text-amber-500  text-sm',
  },
};

export function EntitlementStatusLabel({
  status,
}: {
  status: EEntitlementStatus
}) {
  const { label, className } = statusConfig[status] ?? statusConfig[status];

  return <div className={className}>{label}</div>;
}
