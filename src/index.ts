import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { resolvers } from './resolvers/index';

const PORT = 4000;

/**
 * Starts the Apollo GraphQL server.
 */
async function startServer() {
  const schemaPath = path.resolve(import.meta.dirname, './schema/schema.graphql');
  const typeDefs = readFileSync(schemaPath, 'utf-8');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

await startServer();
