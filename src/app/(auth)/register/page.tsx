import { Metadata } from 'next';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from '@/components/pages/auth/RegisterForm';

export const metadata: Metadata = { title: 'Register' };

export default function Register() {
	return (
		<Card className='w-full sm:w-[400px]'>
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Create your account now</CardDescription>
			</CardHeader>
			<RegisterForm />
		</Card>
	);
}
