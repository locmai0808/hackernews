import React, { Component } from 'react';
import Story from "./Components/Story.jsx";
import Comments from "./Components/Comments.jsx";
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
class App extends Component {
  
  render() {
    return (
        <Router>
          <div className="App">
              <Route exact path="/" component={Story} />
              <Route exact path="/comments/:storyid" component ={Comments} /> 
          </div>
        </Router>
    );
  }
}

export default App;
