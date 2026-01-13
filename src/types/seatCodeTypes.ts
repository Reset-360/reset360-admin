import { EAssessmentType } from './assessmentTypes';
import { ClientProfile } from './clientTypes';

export enum ESeatCodeStatus {
  UNUSED = 'UNUSED',
  REDEEMED = 'REDEEMED',
  EXPIRED = 'EXPIRED',
}

export type SeatCode = {
  _id: string;
  ref?: string;
  code: string; // short string you give to the student
  batchId: any;
  cohortId?: any;
  type: EAssessmentType;

  status: ESeatCodeStatus;
  redeemedByUserId?: any;
  entitlementId?: any;

  createdAt: Date;
  updatedAt: Date;
  
  clientProfile?: ClientProfile
}