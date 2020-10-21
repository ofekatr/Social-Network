import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Container, Form, Grid, Header } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/gqlQuerries";

export default (props) => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, inputs } = useForm(() => registerUser(), {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      login(userData);
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
    <Container>
      <Grid flow columns="4">
        <Grid.Column></Grid.Column>
        <Grid.Column width="8">
          <Card style={{ borderRadius: "13px", padding:"15px" }} fluid>
            <Grid flow>
              <Grid.Row className="page-title">
                <Header color="teal">Join Today!</Header>
              </Grid.Row>
              <Grid.Row>
                <div className="form-container">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? "loading" : "register-form"}
                  >
                    <Form.Input
                      icon='user'
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
                      icon="envelope"
                      label="Email:"
                      placeholder="Email..."
                      type="email"
                      value={inputs.email}
                      onChange={onChange}
                      error={errors.email}
                    ></Form.Input>
                    <Form.Input
                      name="password"
                      icon="lock"
                      label="Password:"
                      placeholder="Password..."
                      error={errors.password}
                      type="password"
                      value={inputs.password}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="confirmPassword"
                      icon="lock"
                      label="Confirm Password:"
                      placeholder="Confirm..."
                      type="password"
                      value={inputs.confirmPassword}
                      onChange={onChange}
                    ></Form.Input>
                    <Grid>
                      <Grid.Column
                        textAlign="center"
                        style={{ marginTop: "15px" }}
                      >
                        <div>
                          <Button
                            type="submit"
                            primary
                            style={{ marginBottom: "20px" }}
                          >
                            Register
                          </Button>
                        </div>
                      </Grid.Column>
                    </Grid>
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
              </Grid.Row>
            </Grid>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
