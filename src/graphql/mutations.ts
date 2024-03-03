import { gql } from '@apollo/client';

export const REGISTER = gql`
	mutation Register($name: String!, $email: String!) {
		user: register(name: $name, email: $email) {
			id
			name
			email
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!) {
		user: login(email: $email) {
			email
			token
			expired
		}
	}
`;

export const CREATE_ACCOUNT = gql`
	mutation CreateAccount($memberNo: String!, $amount: String!) {
		account: createAccount(memberNo: $memberNo, amount: $amount) {
			id
			userId
			memberNo
			amount
		}
	}
`;

export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($memberNo: String!, $amount: String!) {
		account: updateAccount(memberNo: $memberNo, amount: $amount) {
			id
			userId
			memberNo
			amount
		}
	}
`;

export const DELETE_ACCOUNT = gql`
	mutation DeleteAccount($memberNo: String!) {
		account: deleteAccount(memberNo: $memberNo) {
			id
			userId
			memberNo
			amount
		}
	}
`;
