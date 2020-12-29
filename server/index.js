import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import resolvers from './resolvers'
import mongoose from 'mongoose'

var db = mongoose.connection;
db.once('open', function(){
  console.log("DB open");
});

mongoose.connect('mongodb://localhost/labyrinth', {useNewUrlParser: true});


const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  // playground: false
});

const app = express();
server.applyMiddleware({ app, path: '/graphql' });
app.use('/', express.static('public'))

app.listen({ port: 4000 }, () =>
  console.log('Server ready'));
