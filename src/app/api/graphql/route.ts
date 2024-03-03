import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { prisma } from '@/utils/prisma';
import { typeDefs } from '@/graphql/schemas';
import { resolvers } from '@/graphql/resolvers';

import type { Context } from '@/graphql/resolvers';

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(apolloServer, { context: async (req, res) => ({ req, res, prisma }) });

export { handler as GET, handler as POST };
