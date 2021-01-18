import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'

import history from 'connect-history-api-fallback'

import schema from './schema'
import resolvers from './resolvers'

var db = mongoose.connection;
db.once('open', function(){
    console.log("DB open");
});

mongoose.connect('mongodb://localhost/labyrinth', {
    useNewUrlParser: true,
    useFindAndModify: false
});



const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    // playground: false
});

const app = express();
server.applyMiddleware({ app, path: '/graphql' });

app.use(history());
app.use(express.static('public'))

app.listen({ port: 3000 }, () =>
    console.log('Server ready')
);
