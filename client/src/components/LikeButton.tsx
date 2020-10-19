import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST } from "../utils/gqlQuerries";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

export default ({ post: { id, likeCount, likes } }) => {
  const { user } = useContext(AuthContext);
  const [likeData, setLikeData] = useState({
    isLiked: false,
  });

  useEffect(() => {
    setLikeData({
      ...likeData,
      isLiked: user && likes.find(({ username }) => username === user.username),
    });
  }, [user, likes, likeData]);

  const [like] = useMutation(LIKE_POST, {
    update(_, result) {
      setLikeData({
        ...likeData,
        isLiked: !likeData.isLiked,
      });
    },
    variables: {
      postId: id,
    },
  });
  function likePost() {
    like();
  }

  const likeBtn = (
    <div>
      {user ? (
        <Button
          color="teal"
          size="tiny"
          onClick={likePost}
          basic={!likeData.isLiked}
        >
          <Icon name="heart" />
        </Button>
      ) : (
        <Button color="teal" size="tiny" basic as={Link} to="/login">
          <Icon name="heart" />
        </Button>
      )}
    </div>
  );

  return (
    <Button as="div" labelPosition="right">
      {likeBtn}
      <Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};
