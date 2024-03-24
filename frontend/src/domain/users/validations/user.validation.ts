import { z } from 'zod';

const phoneNumberRegex = /^\+7\d{10}$/;

const REQUIRED_ERROR = 'Обязательное поле';
const FLAT_ERROR = 'Не может быть меньше 0';
const NUMBER_ERROR = 'Неверный формат';

export const UserSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  surname: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  patronymic: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  city: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  street: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  house: z.string().min(1, { message: REQUIRED_ERROR }).max(60),
  flat: z.number().min(1, { message: FLAT_ERROR }).max(9999),
  phone1: z.string().regex(phoneNumberRegex, { message: NUMBER_ERROR }).min(1, { message: REQUIRED_ERROR }),
  phone2: z.string().refine((value) => !value || phoneNumberRegex.test(value), { message: NUMBER_ERROR }),
});
