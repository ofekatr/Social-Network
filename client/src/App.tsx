import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menubar from "./components/semantic-ui/Menubar";
import Container from "./components/semantic-ui/Container";

import { AuthContextProvider } from "./context/auth";
import AuthRoute from "./components/AuthRoute";
import SinglePost from "./pages/SinglePost";
import { Card } from "semantic-ui-react";

function App() {
  return (
    <div className="bg">
      <AuthContextProvider>
        <Router>
          <Container>
            <Card id="content" fluid>
              <Menubar />
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/posts/:postId" component={SinglePost} />
              <Route exact path="*">
                <Redirect to="/" />
              </Route>
            </Card>
          </Container>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
