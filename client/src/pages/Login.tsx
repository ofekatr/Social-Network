import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

export default (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, inputs } = useForm(() => login(), {
    username: "",
    password: "",
  });

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        id
        email
        username
        createdDate
        token
      }
    }
  `;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      setErrors({ ...err.graphQLErrors[0].extensions!.exception.errors });
    },
    variables: { ...inputs },
  });

  function login() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading" : "register-form"}
      >
        <Form.Input
          name="username"
          label="Username:"
          placeholder="Username..."
          type="text"
          value={inputs.username}
          onChange={onChange}
          error={errors.username}
        ></Form.Input>
        <Form.Input
          name="password"
          label="Password:"
          placeholder="Password..."
          error={errors.password}
          type="password"
          value={inputs.password}
          onChange={onChange}
        ></Form.Input>
        <div>
          <Button type="submit" primary>
            Register
          </Button>
        </div>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((v) => (
              <li key={v as string}>{v as string}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
