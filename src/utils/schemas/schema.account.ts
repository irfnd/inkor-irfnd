import { messages } from '@/utils/schemas/error.message';
import { z } from 'zod';
import validator from 'validator';

const { account } = messages;

export const AccountSchema = z.object({
	memberNo: z
		.string()
		.trim()
		.min(1, { message: account.memberNo.required })
		.length(10, { message: account.memberNo.length })
		.refine((val) => validator.isNumeric(val, { no_symbols: true }), { message: account.memberNo.valid })
		.describe('Account member number'),
	amount: z
		.string()
		.trim()
		.min(1, { message: account.amount.required })
		.refine((val) => validator.isNumeric(val, { no_symbols: true }), { message: account.amount.valid })
		.describe('Account amount'),
});

export type AccountType = z.infer<typeof AccountSchema>;
