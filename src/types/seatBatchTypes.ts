import { EAssessmentType } from './assessmentTypes';
import { Organization } from './organizationTypes';

export enum EGenerationStatus {
  Queued = "QUEUED",
  Generating = "GENERATING",
  Done = "DONE",
  Failed = "FAILED",
}

export type SeatBatch = {
  _id: string;
  ref?: string;
  organizationId: any;
  cohortId?: any;
  type: EAssessmentType;
  totalSeats: number;
  seatsIssued: number; // how many codes generated
  seatsRedeemed: number; // how many codes redeemed
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

