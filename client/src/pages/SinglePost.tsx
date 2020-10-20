import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST } from "../utils/gqlQuerries";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import Comments from "../components/Comments";

export default (props) => {
  const { postId } = props.match.params;
  const { data, loading } = useQuery(FETCH_POST, {
    variables: { postId },
  });

  const deleteBtnCallback = () => props.history.push('/');

  let post;
  if (!loading) {
    const { user } = useContext(AuthContext);

    const {
      username,
      id,
      body,
      createdDate,
      likeCount,
      likes,
      commentCount,
      comments,
    } = data.getPost;
    post = (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="2">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                size="small"
                floated="right"
              ></Image>
            </Grid.Column>
            <Grid.Column width="10">
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdDate).fromNow()} </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <CardContent extra>
                  <LikeButton post={{ id, likeCount, likes }} user={user} />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("Comment on post")}
                  >
                    <Button size="tiny" basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deleteBtnCallback}/>
                  )}
                </CardContent>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Comments id={id} comments={comments} user={user} />
      </div>
    );
  } else {
    post = <div className="loading"></div>;
  }

  return <div>{post}</div>;
};
