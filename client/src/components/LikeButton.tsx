import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST } from "../utils/gqlQuerries";
import { Link } from "react-router-dom";
import InvertedPopup from "./InvertedPopup";

export default ({ post: { id, likeCount, likes }, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(
      user && likes.find(({ username }) => username === user.username)
    );
  }, [user, likes]);

  const [like] = useMutation(LIKE_POST, {
    update(_, result) {
      setIsLiked(!isLiked);
    },
    onError(_) {},
    variables: {
      postId: id,
    },
  });
  function likePost() {
    like();
  }

  const likeBtn = user ? (
    <Button size="tiny" color="teal" basic={!isLiked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button size="tiny" as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <InvertedPopup
      content="Like"
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeBtn}
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
};
