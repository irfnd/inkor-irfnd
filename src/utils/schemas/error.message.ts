export const messages = {
	// User Messages
	user: {
		email: {
			valid: 'Email must be a valid email address.',
			required: 'Email is required.',
		},
		name: {
			min: 'Name must be at least 3 characters long.',
			max: 'Name must be at most 30 characters long.',
			valid: 'Name must be alphabetic with spaces',
		},
	},

	// Account Messages
	account: {
		memberNo: {
			valid: 'Member Number must be numeric.',
			required: 'Member Number is required.',
			length: 'Member Number must be 10 characters long.',
		},
		amount: {
			valid: 'Amount must be numeric.',
			required: 'Amount is required.',
		},
	},
};
