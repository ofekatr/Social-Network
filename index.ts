const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');

export { };

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB Connected!');
    return server.listen({ port: 5000 });
  }).then((res) => console.log(`Server running at ${res.url}`))
  .catch(err => {
    console.log(`DB Connection Error: ${ err.message }`);
  });


