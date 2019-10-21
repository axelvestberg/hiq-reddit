import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Posts from "./posts/Posts";
import Post from "./post/Post";
import "./App.css";
import history from "../history";

const App = () => {
  return (
    <div className="ui container app-bg">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/comments/:id" exact component={Post} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
