import { z } from 'zod';
import { EAssessmentType } from '../types/assessmentTypes';

export const SeatBatchSchema = z.object({
  organizationId: z
    .string('Organization is required')
    .min(1),

  cohortId: z.string().optional().nullable(),

  totalSeats: z
    .number()
    .min(1, "Total seats must be at least 1"),

  expiresAt: z.string().optional().nullable(),
});

export type SeatBatchFormValues = z.infer<typeof SeatBatchSchema>;

export const GenerateSeatCodeSchema = z.object({
  batchId: z.string().min(1, 'batchId is required'),
  cohortId: z.string().optional().nullable(),
  type: z.enum(
    Object.values(EAssessmentType) as [string, ...string[]],
    {
      error: `Invalid type: must be one of ${Object.values(EAssessmentType).join(', ')}`
    }
  ),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(5000, 'Quantity too large'),
});

export type GenerateSeatCodeValues = z.infer<typeof GenerateSeatCodeSchema>;