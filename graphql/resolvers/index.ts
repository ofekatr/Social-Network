const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentResolvers = require('./comments');

export {};

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}