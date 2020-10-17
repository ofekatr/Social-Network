const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');

export {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDb connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`));
