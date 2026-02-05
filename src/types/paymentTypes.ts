import { CurrencyCode } from './settingsTypes';

export enum EPaymentProvider {
  Paymongo = 'paymongo',
  Manual = 'manual',
}

export enum EPaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Voided = 'voided',
  Refunded = 'refunded',
}

export enum EManualPaymentMethod {
  Cash = 'cash',
  BankTransfer = 'bank_transfer',
  GCashManual = 'gcash_manual',
  Check = 'check',
  Invoice = 'invoice',
  Comp = 'comp',
  Other = 'other',
}

export interface IPaymentProviderMeta {
  paymongo?: {
    paymentIntentId?: string | null;
    paymentIntentStatus?: string | null;
    lastEventId?: string | null;
    clientKey?: string | null;
    method?: string | null;
  };

  manual?: {
    method?: EManualPaymentMethod | null;
    referenceNo?: string | null;
    notes?: string | null;
    receivedAt?: Date | null;
  };
}

export interface Payment {
  _id: string;
  ref: string;
  purchaseId: string | null;

  provider: EPaymentProvider;
  status: EPaymentStatus;

  currency?: string;
  amount: number;

  createdBy?: string | null; // admin userId for manual logging
  paidAt?: Date | null;

  providerMeta?: IPaymentProviderMeta;

  createdAt?: Date;
  updatedAt?: Date;
}
