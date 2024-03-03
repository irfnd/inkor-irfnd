import { jwtDecode } from 'jwt-decode';

type TokenValue = { sub: string; email: string; iat: number; exp: number; jti: string };

export const parseToken = (token: string) => {
	return jwtDecode<TokenValue>(token);
};

export const parseCurrency = (currency: number) => {
	const options = { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 };
	return new Intl.NumberFormat('id-ID', options).format(currency);
};
