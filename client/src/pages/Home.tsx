import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../utils/gqlQuerries";

export default () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <div>
      <Grid columns="three" divided>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <div>
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            </div>
          )}
        </Grid.Row>
        <hr />
        <Grid.Row>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.getPosts.map((post: any) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};
