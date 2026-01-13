import { z } from 'zod';

export const OrganizationSchema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  email: z.email({ message: 'Email is required' }),
  phone: z
    .string('Phone is required')
    .regex(/^(9\d{9}|[6-9]\d{9})$/, 'Invalid phone number'),
  address: z.string().optional().or(z.literal('')),
});

export type OrganizationFormValues = z.infer<typeof OrganizationSchema>;
