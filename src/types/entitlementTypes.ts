import { EAssessmentType } from './assessmentTypes';
import { ClientProfile } from './clientTypes';

export enum EEntitlementStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE', // user started an assessment with it
  CONSUMED = 'CONSUMED', // submitted
  EXPIRED = 'EXPIRED',
}

export enum EEntitlementSource {
  DIRECT_USER_PURCHASE = 'DIRECT_USER_PURCHASE',
  ORG_BULK_CODE = 'ORG_BULK_CODE',
  ADMIN_GRANT = 'ADMIN_GRANT',
}

export interface Entitlement {
  _id: string;
  ref: string;
  userId: string;
  type: EAssessmentType; // ADAPTS-S, ADAPTS-P, etc.
  organizationId?: string;
  cohortId?: string;
  maxAttempts: number; // for now 1, future-proof if you sell bundles
  attemptsUsed: number; // 0 or 1 for now
  status: EEntitlementStatus;
  source: EEntitlementSource;
  sourceRef?: string; // payment id OR bulk batch id OR code id, etc.
  paymentId: string;
  assessmentId?: string; // link to actual attempt when used
  clientProfile?: ClientProfile;
  createdAt: Date;
  updatedAt: Date;
}