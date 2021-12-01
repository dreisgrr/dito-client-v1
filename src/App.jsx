import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Landing from "./subscriber/pages/Landing";

class App extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          
        </Switch>
      </Router>
    )
  }
}

export default App;
