const postsResolvers = require('./posts');
const usersResolvers = require('./users');

export {};

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}