import * as React from 'react';
import { parseCurrency } from '@/utils/parse.utils';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { IconCreditCard, IconCash, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import AccountForm from '@/components/pages/home/AccountForm';

interface IProps {
	account: Record<string, any>;
}

export default function AccountCard({ account }: IProps) {
	const [openDialogUpdate, setOpenDialogUpdate] = React.useState(false);
	const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

	return (
		<>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle className='flex justify-between items-center gap-2'>
						<div className='flex items-center gap-2'>
							<IconCreditCard className='w-[25px] h-[25px]' />
							{account.memberNo}
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<IconDotsVertical className='w-[20px] h-[20px]' />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className='flex gap-2 items-center cursor-pointer'
									onClick={() => setOpenDialogUpdate(true)}
								>
									<IconEdit className='w-[15px] h-[15px]' />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									className='flex gap-2 items-center text-destructive focus:text-destructive cursor-pointer'
									onClick={() => setOpenDialogDelete(true)}
								>
									<IconTrash className='w-[15px] h-[15px]' />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardTitle>
					<CardDescription className='flex items-center gap-2'>
						<IconCash className='w-[20px] h-[20px]' />
						{parseCurrency(account.amount)}
					</CardDescription>
				</CardHeader>
			</Card>

			<Dialog open={openDialogUpdate} onOpenChange={setOpenDialogUpdate}>
				<DialogContent className='w-[400px]'>
					<DialogHeader>
						<DialogTitle>Update Account</DialogTitle>
						<DialogDescription>Make sure to update right member number.</DialogDescription>
					</DialogHeader>
					<AccountForm type='update' selectedData={account} closeDialog={() => setOpenDialogUpdate(false)} />
				</DialogContent>
			</Dialog>

			<Dialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
				<DialogContent className='w-[400px]'>
					<DialogHeader>
						<DialogTitle>Delete Account</DialogTitle>
						<DialogDescription>Are you sure to delete this account?</DialogDescription>
					</DialogHeader>
					<AccountForm type='delete' selectedData={account} closeDialog={() => setOpenDialogDelete(false)} />
				</DialogContent>
			</Dialog>
		</>
	);
}
