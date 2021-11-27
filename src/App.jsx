import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./Landing";
import Admin from "./Admin";

class App extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Router>
      <Routes>
            <Route
              exact
              path='/'
              element={<Landing/>}
            />
            <Route
              exact
              path='/admin'
              element={<Admin/>}
            />
          </Routes>
        </Router>
    )
  }
}

export default App;
