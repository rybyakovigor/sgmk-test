// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schemas
import { UserSchema } from './create-user.dto';
import { UpdatePhoneSchema } from '@/modules/phones/dto/update-phone.dto';

const UpdateUserSchema = z.object({
  ...UserSchema.shape,
  phones: z.array(UpdatePhoneSchema).min(1),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
