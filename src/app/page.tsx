'use client';

import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries';
import useToken from '@/utils/hooks/useToken';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IconLogout, IconPlus, IconUser } from '@tabler/icons-react';
import AccountCard from '@/components/pages/home/AccountCard';
import AccountForm from '@/components/pages/home/AccountForm';
import Loading from '@/components/pages/home/Loading';
import LogoutConfirm from '@/components/pages/home/LogoutConfirm';

export default function Home() {
	const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
	const [openDialogLogout, setOpenDialogLogout] = React.useState(false);
	const token = useToken();
	const { loading, data } = useQuery(GET_USER, { variables: { email: token?.email } });

	if (loading) return <Loading />;
	return (
		<div className='flex justify-center min-h-screen p-10 sm:px-0'>
			<div className='flex flex-col w-full sm:w-[1000px] sm:mx-10 gap-10'>
				<div className='flex items-center w-full gap-3'>
					<Avatar className='w-[50px] h-[50px]'>
						<AvatarFallback>
							<IconUser className='h-6 w-6' />
						</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-bold'>{data?.user?.name}</p>
						<p className='text-xs'>{data?.user?.email}</p>
					</div>
					<div className='flex ml-auto gap-3'>
						<Button variant='default' size='icon' onClick={() => setOpenDialogAdd(true)}>
							<IconPlus className='h-4 w-4' />
						</Button>
						<Button variant='outline' size='icon' onClick={() => setOpenDialogLogout(true)}>
							<IconLogout className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{data?.user?.account?.map((account: Record<string, any>) => (
						<AccountCard account={account} key={account.memberNo} />
					))}
				</div>
			</div>

			<Dialog open={openDialogAdd} onOpenChange={setOpenDialogAdd}>
				<DialogContent className='w-[400px]'>
					<DialogHeader>
						<DialogTitle>Add New Account</DialogTitle>
						<DialogDescription>Make sure member number not taken.</DialogDescription>
					</DialogHeader>
					<AccountForm closeDialog={() => setOpenDialogAdd(false)} />
				</DialogContent>
			</Dialog>

			<LogoutConfirm open={openDialogLogout} onOpenChange={setOpenDialogLogout} />
		</div>
	);
}
