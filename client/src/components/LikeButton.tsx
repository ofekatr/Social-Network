import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST } from "../utils/gqlQuerries";
import { AuthContext } from "../context/auth";

export default ({ post: { id, likeCount, likes } }) => {
  const { user } = useContext(AuthContext);
  const [likeData, setLikeData] = useState({
    isLiked: likes.findIndex(({ username }) => username === user.username) !== -1,
    likeCount
  });

  const [like, { error }] = useMutation(LIKE_POST, {
    update(_, result) {
      setLikeData({
          ...likeData,
          isLiked: !likeData.isLiked,
          likeCount: likeData.isLiked ? likeData.likeCount - 1 : likeData.likeCount + 1
      });
    },
    variables: {
      postId: id,
    },
  });
  function likePost() {
    like();
  }

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button color="teal" size="tiny" basic={!likeData.isLiked}>
        <Icon name="heart" />
      </Button>
      <Label as="a" basic color="teal" pointing="left">
        {likeData.likeCount}
      </Label>
    </Button>
  );
};
