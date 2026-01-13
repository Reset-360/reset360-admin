import { ClientProfile } from './clientTypes';
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
  userId: any;
  organizationId?: any;
  cohortId?: any;
  type: EAssessmentType;
  subScales?: Record<string, any>,
  totalSubScaleScores?: Record<string, any>;
  tScore: number,
  tScoreSummary?: Record<string, any>;
  totalRating: number;
  answers?: Record<string, any>;
  riskBand?: ERiskBand,
  riskLevel?: ERiskLevel,
  startedAt?: Date;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  clientProfile?: ClientProfile
  seatCode?: SeatCode
}