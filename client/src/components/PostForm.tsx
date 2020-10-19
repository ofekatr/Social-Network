import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import lodash from 'lodash';

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { ADD_POST, FETCH_POSTS_QUERY } from "../utils/gqlQuerries";

export default () => {
  const { user } = useContext(AuthContext);
  const username =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);
  const { onChange, onSubmit, inputs } = useForm(createPost, {
    body: "",
  });

  const [add, { loading }] = useMutation(ADD_POST, {
    variables: { ...inputs },
    update(proxy, result) {
      const data: any = lodash.cloneDeep(proxy.readQuery({
        query: FETCH_POSTS_QUERY
      }));
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY, data
      });
      inputs.body = "";
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions!.exception.errors);
    },
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
          className="form-container"
        />
        <Button size="big" type="submit" primary>
          Post
        </Button>
      </Form>
    </div>
  );
};
