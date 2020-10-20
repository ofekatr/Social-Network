import gql from 'graphql-tag';

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdDate
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdDate
        body
      }
    }
  }
`;

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        id
        email
        username
        createdDate
        token
      }
    }
  `;

const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdDate
        token
      }
    }
  `;

const ADD_POST = gql`
          mutation createPost($body: String!) {
              createPost(body: $body) {
                  id
                  body
                  username
                  createdDate
                  comments {
                    id
                    body
                    username
                    createdDate
                  }
                  commentCount
                  likes {
                    id
                    username
                    createdDate
                  }
                  likeCount
              }
          }
      `;

const LIKE_POST = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const FETCH_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdDate
      username
      likeCount
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdDate
        body
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdDate
        body
      }
      commentCount
    }
  }
`;

const CREATE_COMMENT = gql`
mutation createComment($postId: ID!, $body: String!){
  createComment(commentInput: {
    postId: $postId,
    body: $body
  }){
    id
    comments {
      id
      username
      body
      createdDate
      
    }
    commentCount
  }
}
`;

export {
  ADD_POST,
  FETCH_POSTS_QUERY,
  LOGIN_USER,
  REGISTER_USER,
  LIKE_POST,
  FETCH_POST,
  DELETE_POST,
  DELETE_COMMENT,
  CREATE_COMMENT
}