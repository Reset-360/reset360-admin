import { ClientProfile } from './clientTypes';
import { Organization } from './organizationTypes';
import { SeatCode } from './seatCodeTypes';

export enum EAssessmentType {
  ADAPTS_S = "ADAPTS-S",
  ADAPTS_P = "ADAPTS-P",
  ADAPTS_T = "ADAPTS-T",
  ADAPTS_C = "ADAPTS-C",
}

export enum ERiskBand {
  low = "low",
  moderate = "moderate",
  high = "high",
}

export enum ERiskLevel {
  low = "Low Risk",
  moderate = "Moderate Risk",
  high = "High Risk",
}

export type Assessment = {
  _id: string;
  ref?: string;
  userId: string;
  entitlementId?: string;
  organizationId?: string;
  cohortId?: string;
  type: EAssessmentType;
  subScales?: Record<string, any>;
  totalSubScalesScore?: Record<string, any>;
  elevatedSubscales?: string[];
  effectiveTScore?: number;
  totalRawScore?: number;
  totalTScore?: number;
  tScoreCategory?: string;
  riskBand?: ERiskBand;
  riskLevel?: ERiskLevel;
  normNote?: string | null;
  isNormValidated?: boolean;
  hasSelfHarmFlag?: boolean;
  answers?: Record<string, any>;
  answersDraft?: Record<string, any>;
  currentQuestionIndex: number;
  timeSpentSec: number;
  startedAt?: Date;
  submittedAt?: Date;
  
  clientProfile?: ClientProfile
  seatCode?: SeatCode
  organization: Organization
}