import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
