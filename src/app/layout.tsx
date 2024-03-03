import type { Metadata } from 'next';

import '@/app/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Toaster } from '@/components/ui/sonner';
import ApolloWrapper from '@/components/providers/ApolloWrapper';
import ThemeProvider from '@/components/providers/ThemeProvider';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: {
		template: '%s | NextJS + GraphQL',
		default: 'Home | NextJS + GraphQL',
	},
	description: 'React JS Problem Interview - Irfandi Iqbal Abimanyu',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
					<ApolloWrapper>{children}</ApolloWrapper>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
