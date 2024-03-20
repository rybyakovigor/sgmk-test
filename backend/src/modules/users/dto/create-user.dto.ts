// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  name: z.string().max(60),
  surname: z.string().max(60),
  patronymic: z.string().max(60),
  city: z.string().max(60),
  street: z.string().max(60),
  house: z.string().max(60),
  flat: z.number().min(1).max(9999),
});

export class CreateUserDto extends createZodDto(UserSchema) {}
