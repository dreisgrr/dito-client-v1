import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./subscriber/pages/Landing";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";

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
              element={<AdminLogin/>}
            />
            <Route
              exact
              path='/adminHome'
              element={<AdminHome/>}
            />
          </Routes>
        </Router>
    )
  }
}

export default App;
