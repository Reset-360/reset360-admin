import { z } from 'zod';
import { EEducationLevel } from '../types/cohortTypes';

export const CohortSchema = z.object({
  organizationId: z
    .string('Organization is required')
    .min(1, "Organization is required"), // ObjectId as string
  name: z
    .string('Cohort name is required')
    .min(1, "Cohort name is required"),
  description: z.string().optional().nullable(),
  educationLevel: z.string('Education level is required'),
  isActive: z.boolean().optional().default(true),
});

export type CohortFormValues = z.infer<typeof CohortSchema>;