import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Container, Form, Grid, Header } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/gqlQuerries";

export default (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, inputs } = useForm(() => login(), {
    username: "",
    password: "",
  });

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
    <Container>
      <Grid flow columns="4">
        <Grid.Column></Grid.Column>
        <Grid.Column width="8">
          <Card className="form" fluid>
            <Grid flow>
              <Grid.Row className="page-title">
                <Header color="teal">Welcome Back!</  Header>
              </Grid.Row>
              <Grid.Row>
                <div className="form-container">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={loading ? "loading" : "register-form"}
                  >
                    <Form.Input
                      name="username"
                      icon="user"
                      label="Username:"
                      placeholder="Username..."
                      type="text"
                      value={inputs.username}
                      onChange={onChange}
                      error={errors.username}
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
                            Login
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
