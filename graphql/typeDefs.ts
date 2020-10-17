const gql = require('graphql-tag');

export { };

module.exports = gql`
  
  type Post {
    id: ID!
    body: String!
    username: String!
    createdDate: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    createdDate: String!
    username: String!
    body: String!
  }

  type Like {
    id: ID!
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

  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input CommentInput {
    postId: String!
    body: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(commentInput: CommentInput!): Comment!
    deleteComment(postId: ID! commentId: ID!): Comment!
    likePost(postId: ID!, username: String!): Like!
  }
`;