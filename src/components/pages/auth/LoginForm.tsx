'use client';

import * as React from 'react';
import Link from 'next/link';
import { LoginSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/mutations';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IconLoader } from '@tabler/icons-react';

import type { LoginType } from '@/utils/schemas';

export default function LoginForm() {
	const [onLogin, { loading, error }] = useMutation(LOGIN);
	const form = useForm<LoginType>({ resolver: zodResolver(LoginSchema), defaultValues: { email: '' } });
	const router = useRouter();

	const onSubmit = async (data: LoginType) => {
		try {
			await onLogin({ variables: data });
			if (error) throw new Error(error.message);
			toast.success('Login successful!', { description: 'Welcome back!', position: 'top-right' });
			router.replace('/');
		} catch (err) {
			if (err instanceof Error) toast.error('Login failed!', { description: err.message, position: 'top-right' });
		}
	};

	return (
		<>
			<CardContent>
				<Form {...form}>
					<form id='login-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='Enter your email address' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col gap-4'>
				<Button form='login-form' type='submit' className='w-full' disabled={loading}>
					{loading ? <IconLoader className='mr-1 h-4 w-4 animate-spin' /> : null}
					Login
				</Button>
				<p className='text-sm'>
					Don&apos;t have an account?{' '}
					<Button asChild variant='link' className='p-0 h-fit'>
						<Link href='/register'>Register</Link>
					</Button>
				</p>
			</CardFooter>
		</>
	);
}
