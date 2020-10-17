const gql = require('graphql-tag');

export { };

module.exports = gql`
  
  type Post {
    id: ID!
    body: String!
    username: String!
    createdDate: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdDate: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;