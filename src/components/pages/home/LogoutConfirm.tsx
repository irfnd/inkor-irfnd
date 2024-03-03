import { useRouter } from 'next/navigation';
import deleteCookie from '@/utils/actions/deleteCookie';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function LogoutConfirm({ open, onOpenChange }: IProps) {
	const router = useRouter();

	const onLogout = async () => {
		await deleteCookie('token');
		router.replace('/login');
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Logging out will end your current session and you won&apos;t be able to access your account until you log back
						in.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onLogout}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
