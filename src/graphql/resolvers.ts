import { cookies } from 'next/headers';
import { parseToken } from '@/utils/parse.utils';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import type { PrismaClient } from '@prisma/client';

const { JWT_SECRET, JWT_EXPIRED, COOKIE_EXPIRED } = process.env;

export type Context = { prisma: PrismaClient };

export const resolvers = {
	Query: {
		user: async (_parent: any, args: any, context: Context) => {
			const getCookies = cookies().get('token');
			if (!getCookies?.value) return new Error("You're not authenticated");
			const { email } = parseToken(getCookies.value);
			return context.prisma.user.findUnique({ where: { email }, include: { account: true } });
		},
		account: async (_parent: any, args: { memberNo: string }, context: Context) => {
			const getCookies = cookies().get('token');
			if (!getCookies?.value) return new Error("You're not authenticated");
			const { sub } = parseToken(getCookies.value);
			return context.prisma.account.findUnique({ where: { memberNo: args.memberNo, userId: sub } });
		},
	},
	Mutation: {
		register: async (_parent: any, args: { name: string; email: string }, context: Context) => {
			return context.prisma.user.create({ data: { name: args.name, email: args.email } });
		},
		login: async (_parent: any, args: { email: string }, context: Context) => {
			const { id, email } = await context.prisma.user.findUniqueOrThrow({ where: { email: args.email } });
			const token = jwt.sign({ sub: id, email }, JWT_SECRET!, { expiresIn: JWT_EXPIRED! });
			cookies().set('token', token, { maxAge: +COOKIE_EXPIRED! });
			return { email, token, expired: 600 };
		},
		createAccount: async (_parent: any, args: { memberNo: string; amount: string }, context: Context) => {
			const getCookies = cookies().get('token');
			if (!getCookies?.value) return new Error("You're not authenticated");
			const { sub } = parseToken(getCookies.value);
			return context.prisma.account.create({ data: { userId: sub, memberNo: args.memberNo, amount: args.amount } });
		},
		updateAccount: async (_parent: any, args: { memberNo: string; amount: string }, context: Context) => {
			const getCookies = cookies().get('token');
			if (!getCookies?.value) return new Error("You're not authenticated");
			return context.prisma.account.update({ where: { memberNo: args.memberNo }, data: { amount: args.amount } });
		},
		deleteAccount: async (_parent: any, args: { memberNo: string }, context: Context) => {
			const getCookies = cookies().get('token');
			if (!getCookies?.value) return new Error("You're not authenticated");
			return context.prisma.account.delete({ where: { memberNo: args.memberNo } });
		},
	},
};
