// Core
import { createZodDto } from 'nestjs-zod';
import { UserSchema } from './create-user.dto';

const UpdateUserSchema = UserSchema.partial();

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
