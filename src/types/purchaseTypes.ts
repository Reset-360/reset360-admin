import { EPaymentProvider } from './paymentTypes';
import { CurrencyCode } from './settingsTypes';

export enum EPurchaseBuyerType {
  Individual = 'individual',
  Organization = 'organization',
}

export enum EPurchaseStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Expired = 'expired',
  Cancelled = 'cancelled',
}

export enum EProductCode {
  ADAPTS_SEAT = 'ADAPTS_SEAT',
}

export interface PurchaseItem {
  code: EProductCode;
  quantity: number;
}

export interface PricingSnapshotItem {
  code: EProductCode;
  quantity: number;
  unitAmount: number; // centavos
  totalAmount: number; // centavos
  currency: CurrencyCode;
  matchedTierId?: string | null;
  matchedTierName?: string | null;
}

export interface PurchasePricingSnapshot {
  currency: CurrencyCode;
  items: PricingSnapshotItem[];
  subtotalAmount: number; // centavos
  totalAmount: number; // centavos
}

export interface IPurchaseBuyer {
  type: EPurchaseBuyerType;

  // Individual checkout (logged-in)
  userId?: string | null;

  // Organization checkout (marketing website)
  organizationName?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export interface Purchase {
  _id: string;
  ref: string;

  buyer: IPurchaseBuyer;
  status: EPurchaseStatus;

  items: PurchaseItem[];
  pricingSnapshot: PurchasePricingSnapshot;

  // PayMongo fields come later (keep placeholder)
  paymentId: string | null
  paymentProvider?: EPaymentProvider;
  paymongo?: {
    paymentIntentId?: string | null;
    paymentIntentStatus?: string | null;
    lastEventId?: string | null;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
