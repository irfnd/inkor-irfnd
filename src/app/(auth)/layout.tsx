export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <div className='flex justify-center items-center min-h-screen px-10 sm:px-0'>{children}</div>;
}
