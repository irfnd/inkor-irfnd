import { gql } from '@apollo/client';

export const GET_USER = gql`
	query User {
		user {
			id
			name
			email
			account {
				id
				memberNo
				amount
			}
		}
	}
`;

export const GET_ACCOUNT = gql`
	query Account($memberNo: String!) {
		account(memberNo: $memberNo) {
			id
			userId
			memberNo
			amount
		}
	}
`;
