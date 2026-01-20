import { EEntitlementSource } from '@/src/types/entitlementTypes';

const sourceConfig = {
  [EEntitlementSource.ADMIN_GRANT]: {
    label: 'Admin Grant',
    className: 'text-sm',
  },
  [EEntitlementSource.DIRECT_USER_PURCHASE]: {
    label: 'Direct Purchase',
    className: 'text-sm',
  },
  [EEntitlementSource.ORG_BULK_CODE]: {
    label: 'Organization',
    className: 'text-sm',
  },
};

export function EntitlementSourceLabel({
  source,
}: {
  source: EEntitlementSource;
}) {
  const { label, className } = sourceConfig[source] ?? sourceConfig[source];

  return <div className={className}>{label}</div>;
}

export const EntitlementSourceLabelText: Record<EEntitlementSource, string> = {
  [EEntitlementSource.ADMIN_GRANT]: 'Admin Grant',
  [EEntitlementSource.DIRECT_USER_PURCHASE]: 'Direct Purchase',
  [EEntitlementSource.ORG_BULK_CODE]: 'Organization Code',
};
