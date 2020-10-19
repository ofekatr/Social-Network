import gql from "graphql-tag";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utils/hooks";

export default (props) => {
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, inputs } = useForm(() => registerUser(), {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdDate
        token
      }
    }
  `;

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, result) => {
      props.history.push("/");
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions!.exception.errors);
      console.log(err.graphQLErrors);
      setErrors({ ...err.graphQLErrors[0].extensions!.exception.errors });
    },
    variables: { ...inputs },
  });

  function registerUser() {
    addUser();
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
          //   width="4"
          type="text"
          value={inputs.username}
          onChange={onChange}
          error={errors.username}
        ></Form.Input>
        <Form.Input
          name="email"
          label="Email:"
          placeholder="Email..."
          type="email"
          value={inputs.email}
          onChange={onChange}
          error={errors.email}
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
        <Form.Input
          name="confirmPassword"
          label="Confirm Password:"
          placeholder="Confirm..."
          type="password"
          value={inputs.confirmPassword}
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
