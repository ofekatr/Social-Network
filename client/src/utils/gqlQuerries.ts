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
      username
      createdDate
    }
  }
`;

export {
  ADD_POST,
  FETCH_POSTS_QUERY,
  LOGIN_USER,
  REGISTER_USER,
  LIKE_POST
}