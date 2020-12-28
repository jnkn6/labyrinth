import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  // playground: false
});

const app = express();
server.applyMiddleware({ app, path: '/graphql' });
app.use('/', express.static('public'))

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:3000${server.graphqlPath}`));
