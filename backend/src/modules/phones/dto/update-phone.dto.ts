// Core
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Schemas
import { PhoneSchema } from './create-phone.dto';

export const UpdatePhoneSchema = z.object({
  ...PhoneSchema.shape,
  id: z.string().uuid().optional(),
});

export class UpdatePhoneDto extends createZodDto(UpdatePhoneSchema) {}
