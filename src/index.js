import React from "react";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Story from "./Components/Story.jsx";
import Comments from "./Components/Comments.jsx";

const hist = createHashHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route exact path="/" component={Story} />
        <Route exact path="/comments/:storyid" component ={Comments} /> 
    </Switch>
  </Router>,
  document.getElementById("root")
);
