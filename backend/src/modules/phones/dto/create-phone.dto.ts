// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const phoneNumberRegex = /^\+7\d{10}$/;

export const PhoneSchema = z.object({
  number: z.string().regex(phoneNumberRegex),
});

export class CreatePhoneDto extends createZodDto(PhoneSchema) {}
