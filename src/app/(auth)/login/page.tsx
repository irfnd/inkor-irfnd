import { Metadata } from 'next';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/pages/auth/LoginForm';

export const metadata: Metadata = { title: 'Login' };

export default function Login() {
	return (
		<Card className='w-full sm:w-[400px]'>
			<CardHeader>
				<CardTitle>Welcome</CardTitle>
				<CardDescription>Sign in to your account</CardDescription>
			</CardHeader>
			<LoginForm />
		</Card>
	);
}
