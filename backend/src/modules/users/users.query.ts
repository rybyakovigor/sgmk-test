// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UsersQuerySchema = z.object({
  name: z.string().or(z.array(z.string())).optional(),
  surname: z.string().or(z.array(z.string())).optional(),
  patronymic: z.string().or(z.array(z.string())).optional(),
  city: z.string().or(z.array(z.string())).optional(),
  street: z.string().or(z.array(z.string())).optional(),
  house: z.string().or(z.array(z.string())).optional(),
  flat: z
    .string()
    .transform((value) => Number(value))
    .optional(),
  limit: z
    .string()
    .default('10')
    .transform((value) => Number(value)),
  offset: z
    .string()
    .default('0')
    .transform((value) => Number(value)),
});

export class UsersQuery extends createZodDto(UsersQuerySchema) {}
