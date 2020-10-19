import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

export default () => {
  const { user } = useContext(AuthContext);
  const username = user.username.charAt(0).toUpperCase() + user.username.slice(1)
  const { onChange, onSubmit, inputs } = useForm(createPost, {
    body: "",
  });

  const ADD_POST = gql`
          mutation createPost($body: String!) {
              createPost(body: $body) {
                  id
                  body
                  username
                  createdDate
                  comments {
                    id
                    body
                    username
                    createdDate
                  }
                  commentCount
                  likes {
                    id
                    username
                    createdDate
                  }
                  likeCount
              }
          }
      `;

  const [add, { loading, error }] = useMutation(ADD_POST, {
    variables: { ...inputs },
    update(_, result){
      console.log(result);
      inputs.body = '';
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions!.exception.errors);
    }
  });

  function createPost() {
    console.log(inputs);
    add();
  }

  return (
    <div>
      <Form onSubmit={onSubmit} className={loading ? "loading" : "post-form"}>
        <Form.Input
          name="body"
          type="text"
          placeholder={`${username}, What's on your mind?`}
          onChange={onChange}
        />
        <Button size="big" type="submit" primary>Post</Button>
      </Form>
    </div>
  );
};
