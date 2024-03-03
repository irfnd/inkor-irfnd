import { IconLoader } from '@tabler/icons-react';

export default function Loading() {
	return (
		<div className='flex justify-center items-center w-full min-h-screen'>
			<div className='flex flex-col items-center gap-2'>
				<IconLoader className='w-20 h-20 animate-spin' />
				<p className='font-bold'>Wait a second.</p>
			</div>
		</div>
	);
}
