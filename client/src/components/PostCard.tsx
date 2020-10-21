import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./DeleteButton";
import InvertedPopup from "./InvertedPopup";

export default ({
  post: { body, createdDate, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Card fluid>
        <Card.Content as={Link} to={`/posts/${id}`}>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta>
            {moment(createdDate).fromNow()}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likeCount, likes }} />
          <InvertedPopup
            content="Comments"
            trigger={
              <Button as="div" labelPosition="right">
                <Button
                  color="blue"
                  size="tiny"
                  basic
                  as={Link}
                  to={`/posts/${id}`}
                >
                  <Icon name="comments" />
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            }
          />
          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </div>
  );
};
