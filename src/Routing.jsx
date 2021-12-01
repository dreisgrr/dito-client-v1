import React from 'react'
import {BrowserRouter as Router, Routes, Route, useMatch} from "react-router-dom";
import Landing from "./subscriber/pages/Landing";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";

const Routing = () => {
    return (
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
            path='/admin/home'
            element={<AdminHome tab={"Daily Draw"}/>}
          />
          <Route
            path='/admin/home/daily'
            element={<AdminHome tab={"Daily Draw"}/>}
          />
          <Route
            path='/admin/home/weekly'
            element={<AdminHome tab={"Weekly Draw"}/>}
          />
          <Route
            path='/admin/home/credit'
            element={<AdminHome tab={"Credit Entries"}/>}
          />
        </Routes>
      </Router>
    )
}

export default Routing
