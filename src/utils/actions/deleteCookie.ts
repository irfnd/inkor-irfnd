'use server';

import { cookies } from 'next/headers';

export default async function deleteCookie(name: string) {
	cookies().delete(name);
}
