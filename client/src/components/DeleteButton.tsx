import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Icon, Confirm  } from "semantic-ui-react";
import lodash from "lodash";

import {
  DELETE_POST,
  DELETE_COMMENT,
  FETCH_POSTS_QUERY,
} from "../utils/gqlQuerries";
import InvertedPopup from "./InvertedPopup";

export default (params) => {
  const {
    postId,
    commentId,
    callback,
  }: { postId?: string; commentId?: string; callback?: () => void } = params;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [remove] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data: any = lodash.cloneDeep(
          proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          })
        );
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  function deletePostOrComment() {
    remove();
  }

  return (
    <>
      <InvertedPopup
        content={`Delete ${commentId ? 'Comment' : 'Post'}`}
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            size="tiny"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};
