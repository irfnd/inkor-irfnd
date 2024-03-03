import { getCookie } from 'cookies-next';
import { parseToken } from '@/utils/parse.utils';

export default function useToken() {
	const token = getCookie('token');
	if (token) return parseToken(token);
	return null;
}
