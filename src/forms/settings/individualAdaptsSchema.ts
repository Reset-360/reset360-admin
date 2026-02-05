import { z } from 'zod';

export const AdaptsPriceTierSchema = z.object({
  name: z.string('Tier name is required').min(1),
  minQty: z.number('Min qty is required').int().min(1),
  maxQty: z.number('Max qty is required').int().min(1),
  unitAmount: z.number('Unit amount is required').int().min(1, 'Price amount cannot be less than or equal to 0.00'), // centavos
}).refine(
  (data) => data.maxQty > data.minQty,
  {
    message: "Max qty must be greater than Min qty",
    path: ["maxQty"], // points the error at maxQty
  });

export const IndividualPricingSchema = z.object({
  enabled: z.boolean().optional(),
  currency: z.enum(['PHP']).optional(),
  mode: z.enum(['flat', 'tiered']).optional(),
  unitAmount: z.number().int().min(0).optional(),
  tiers: z.array(AdaptsPriceTierSchema).optional(),
});

export type IndividualPricingValues = z.infer<typeof IndividualPricingSchema>;
export type AdaptsPriceTierValues = z.infer<typeof AdaptsPriceTierSchema>;