import * as React from 'react';
import { AccountSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from '@/graphql/mutations';
import { GET_USER } from '@/graphql/queries';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { IconLoader } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';

import type { AccountType } from '@/utils/schemas';

interface IProps {
	closeDialog: () => void;
	type?: 'add' | 'update' | 'delete';
	selectedData?: Record<string, any>;
}

export default function AccountForm({ closeDialog, type = 'add', selectedData }: IProps) {
	const [onCreateAccount, addAccount] = useMutation(CREATE_ACCOUNT, { refetchQueries: [GET_USER] });
	const [onUpdateAccount, updateAccount] = useMutation(UPDATE_ACCOUNT, { refetchQueries: [GET_USER] });
	const [onDeleteAccunt, deleteAccount] = useMutation(DELETE_ACCOUNT, { refetchQueries: [GET_USER] });
	const form = useForm<AccountType>({ resolver: zodResolver(AccountSchema), defaultValues: { memberNo: '', amount: '0' } });

	React.useEffect(() => {
		if (['update', 'delete'].includes(type) && selectedData) {
			form.setValue('memberNo', selectedData.memberNo);
			form.setValue('amount', selectedData.amount);
		}
	}, [type, selectedData, form]);

	const onSubmit = async (data: AccountType) => {
		try {
			let alert = { msg: '', desc: '' };
			if (type === 'update') {
				await onUpdateAccount({ variables: data });
				if (updateAccount.error) throw new Error(updateAccount.error.message);
				alert.msg = 'Updated successful!';
				alert.desc = 'Account has been updated. Check your account';
			} else if (type === 'delete') {
				await onDeleteAccunt({ variables: data });
				if (deleteAccount.error) throw new Error(deleteAccount.error.message);
				alert.msg = 'Deleted successful!';
				alert.desc = 'Account has been deleted. Check your account';
			} else {
				await onCreateAccount({ variables: data });
				if (addAccount.error) throw new Error(addAccount.error.message);
				alert.msg = 'Added successful!';
				alert.desc = 'Account has been added. Check your account';
			}
			toast.success(alert.msg, { description: alert.desc, position: 'top-right' });
			resetForm();
		} catch (err) {
			if (err instanceof Error) toast.error('Added failed!', { description: err.message, position: 'top-right' });
		}
	};
	const resetForm = () => {
		form.reset();
		closeDialog();
	};

	return (
		<>
			<Form {...form}>
				<form id='account-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='memberNo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Member Number</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										placeholder='Enter new member number'
										disabled={['update', 'delete'].includes(type)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input type='number' min={0} placeholder='Enter amount' {...field} disabled={['delete'].includes(type)} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<DialogFooter className='flex flex-col gap-2'>
				<Button
					variant={type === 'delete' ? 'destructive' : 'default'}
					type='submit'
					form='account-form'
					disabled={addAccount.loading || updateAccount.loading || deleteAccount.loading}
				>
					{addAccount.loading || updateAccount.loading || deleteAccount.loading ? (
						<IconLoader className='mr-1 h-4 w-4 animate-spin' />
					) : null}
					{type === 'add' ? 'Add' : type === 'delete' ? 'Delete' : 'Update'}
				</Button>
				<Button
					variant={type === 'delete' ? 'default' : 'destructive'}
					onClick={resetForm}
					disabled={addAccount.loading || updateAccount.loading || deleteAccount.loading}
				>
					{addAccount.loading || updateAccount.loading || deleteAccount.loading ? (
						<IconLoader className='mr-1 h-4 w-4 animate-spin' />
					) : null}
					Cancel
				</Button>
			</DialogFooter>
		</>
	);
}
