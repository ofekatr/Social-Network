import { Button, Card, Form } from "semantic-ui-react";
import React, { useState } from "react";
import moment from "moment";
import DeleteButton from "./DeleteButton";

import { CREATE_COMMENT } from "../utils/gqlQuerries";
import { useMutation } from "@apollo/react-hooks";

export default ({ id: postId, comments, user }) => {
  const [commentBody, setCommentBody] = useState("");
  const [create] = useMutation(CREATE_COMMENT, {
    update() {
      setCommentBody("");
    },
    variables: { postId, body: commentBody },
  });

  function createComment() {
    create();
  }

  return (
    <>
      {user && (
        <Card fluid>
          <Card.Content>
            <h4>Post a comment:</h4>
            <Form onSubmit={createComment}>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment.."
                  name="commentBody"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                ></input>
                <Button
                  type="submit"
                  className="ui button teal"
                  disabled={commentBody === ""}
                >
                  Comment
                </Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
      {comments.map(({ id, username, createdDate, body }) => (
        <Card fluid id={id}>
          <Card.Content>
            {user && user.username && user.username === username && (
              <DeleteButton postId={postId} commentId={id} />
            )}
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdDate).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};
