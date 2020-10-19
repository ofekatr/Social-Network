import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import gql from "graphql-tag";

import PostCard from '../components/PostCard';

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

export default () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <div>
      <Grid columns="three" divided>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          { loading ?
             (
              <h1>Loading...</h1>
             ) :
             ( 
               data.getPosts.map((post: any) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post}/>
                </Grid.Column>
               ))
             )
          }
        </Grid.Row>
      </Grid>
    </div>
  );
};
