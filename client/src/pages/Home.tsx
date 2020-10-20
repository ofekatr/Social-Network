import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Header, Transition } from "semantic-ui-react";

import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../utils/gqlQuerries";

export default () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Grid columns="three" divided>
            <Grid.Row className="page-title">
              <Header color="teal">Recent Posts</Header>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="post-form">
                {user && (
                  <div>
                    <Grid.Column>
                      <PostForm />
                    </Grid.Column>
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
            <hr />
            <Grid.Row>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <Transition.Group>
                  {data.getPosts &&
                    data.getPosts.map((post: any) => (
                      <Grid.Column key={post.id}>
                        <div className="post-card">
                          <PostCard post={post} />
                        </div>
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  );
};
