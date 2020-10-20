import { Button, Card, Form, Transition } from "semantic-ui-react";
import React, { useRef, useState } from "react";
import moment from "moment";
import DeleteButton from "./DeleteButton";
import lodash from "lodash";

import { CREATE_COMMENT, FETCH_POST } from "../utils/gqlQuerries";
import { useMutation } from "@apollo/react-hooks";

export default ({ id: postId, comments, user }) => {
  const [commentBody, setCommentBody] = useState("");
  const commentInputRef = useRef(null);
  const [create] = useMutation(CREATE_COMMENT, {
    update(proxy, result: any) {
      setCommentBody("");
      commentInputRef.current.blur();
      const data = lodash.clondeDeep(
        proxy.readQuery({
          query: FETCH_POST,
        })
      );
      data.getPost.comments.unshift(result.createPost);
      proxy.writeQuery({
        query: FETCH_POST,
        data,
      });
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
                  ref={commentInputRef}
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
      <Transition.Group>
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
      </Transition.Group>
    </>
  );
};
