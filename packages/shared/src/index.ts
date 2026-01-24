// packages/shared/src/index.ts
import { z } from 'zod';

export const TripSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  destination: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  status: z.enum(['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED']),
  timestamp: z.date()
});

export type Trip = z.infer<typeof TripSchema>;