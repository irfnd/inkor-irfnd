import { messages } from '@/utils/schemas/error.message';
import { z } from 'zod';
import validator from 'validator';

const { user } = messages;

export const LoginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, { message: user.email.required })
		.email({ message: user.email.valid })
		.describe("User's email address"),
});

export const RegisterSchema = LoginSchema.extend({
	name: z
		.string()
		.trim()
		.min(3, { message: user.name.min })
		.max(30, { message: user.name.max })
		.refine((val) => validator.isAlpha(val, 'en-US', { ignore: ' ' }), { message: user.name.valid }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
