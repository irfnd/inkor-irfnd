'use client';

import * as React from 'react';
import Link from 'next/link';
import { RegisterSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { REGISTER } from '@/graphql/mutations';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IconLoader } from '@tabler/icons-react';

import type { RegisterType } from '@/utils/schemas';

export default function RegisterForm() {
	const [onRegister, { loading, error }] = useMutation(REGISTER);
	const form = useForm<RegisterType>({ resolver: zodResolver(RegisterSchema), defaultValues: { email: '', name: '' } });
	const router = useRouter();

	const onSubmit = async (data: RegisterType) => {
		try {
			await onRegister({ variables: data });
			if (error) throw new Error(error.message);
			toast.success('Register successful!', { description: 'Login now!', position: 'top-right' });
			router.replace('/login');
		} catch (err) {
			if (err instanceof Error) toast.error('Register failed!', { description: err.message, position: 'top-right' });
		}
	};

	return (
		<>
			<CardContent>
				<Form {...form}>
					<form id='register-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter your full name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col gap-4'>
				<Button form='register-form' type='submit' className='w-full' disabled={loading}>
					{loading ? <IconLoader className='mr-1 h-4 w-4 animate-spin' /> : null}
					Register
				</Button>
				<p className='text-sm'>
					Have an account?{' '}
					<Link href='/login'>
						<Button variant='link' className='p-0 h-fit'>
							Login
						</Button>
					</Link>
				</p>
			</CardFooter>
		</>
	);
}
