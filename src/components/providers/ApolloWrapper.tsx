'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
	NextSSRApolloClient,
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const checkWindow = typeof window === 'undefined';
	const httpLink = new HttpLink({ uri: '/api/graphql' });
	const link = checkWindow ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink]) : httpLink;
	return new NextSSRApolloClient({ cache: new NextSSRInMemoryCache(), link });
}

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
