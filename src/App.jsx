import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Landing from "./subscriber/pages/Landing";
import Register from "./subscriber/pages/Register";
import RegisterThruPW from "./subscriber/pages/RegisterThruPW";
import Login from "./subscriber/pages/Login";
import LoginPW from "./subscriber/pages/LoginPW";
import Home from "./subscriber/pages/Home";
import RegDetails from "./subscriber/pages/RegDetails";
import Topbar from "./subscriber/components/Topbar"
import { useSelector } from "react-redux";
import "./App.css";
import RafflePage from "./subscriber/pages/RafflePage";
import styled from "styled-components";
import maintenance from "../src/assets/img/maintenance.png";

import LandingReskin from "./reskin/pages/LandingReskin";
import LoginReskin from "./reskin/pages/LoginReskin";
import RegisterReskin from "./reskin/pages/RegisterReskin";
import RegDetailsReskin from "./reskin/pages/RegDetailsReskin";
import HomeReskin from "./reskin/pages/HomeReskin";
import SplashReskin from "./reskin/pages/SplashReskin";


const DITOLogo = styled.div`
    flex: 1;
    width: 700px;
    height: 700px;
    background-image: url(${maintenance});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
    margin: 0 auto;
`;

function  App() {
  const subscriber = useSelector((state) => state.subscriber?.currentUser);
  console.log("Remove"+ subscriber);
  if (subscriber == null) {
    localStorage.removeItem("persist:root");
  }
  const auth = useSelector((state) => state.subscriber?.isNewUser);
  // const subscriber = true;
  // const auth = true;
    return(
      <Router>
        <Switch>
          <Route exact path='/reskin/landing'>
            {subscriber ? <Redirect to='/reskin' /> : <LandingReskin />}
          </Route>
          <Route exact path='/reskin/register'>
            {subscriber ? <Redirect to='/reskin' /> : <RegisterReskin />}
          </Route>
          <Route exact path='/reskin/login'>
            {subscriber ? <Redirect to='/reskin' /> : <LoginReskin />}
          </Route>
          <Route exact path='/reskin/regDetails'>
            {auth ? <RegDetailsReskin /> : <Redirect to='/reskin' />}
          </Route>
          <Route exact path='/reskin/welcomekadito'>
            {auth ? <SplashReskin /> : <Redirect to='/reskin' />}
          </Route>
          <Route exact path='/reskin'>
            {subscriber ? <HomeReskin />
            // <>
            //   <Topbar/>
            //   <div className="container">
            //   <Route exact path='/'>
            //     <RafflePage />
            //   </Route>
            //   </div>
            // </> 
            
            : <LandingReskin />}
          </Route>
          <Route exact path='/current/landing'>
            {subscriber ? <Redirect to='/current' /> : <Landing />}
          </Route>
          <Route exact path='/current/register'>
            {subscriber ? <Redirect to='/current' /> : <Register />}
          </Route>
          <Route exact path='/current/login'>
            {subscriber ? <Redirect to='/current' /> : <LoginPW />}
          </Route>
          <Route exact path='/current/regDetails'>
            {auth ? <RegDetails /> : <Redirect to='/current' />}
          </Route>
          <Route exact path='/current'>
            {subscriber ?
            <>
              <Topbar/>
              <div className="container">
              <Route exact path='/current'>
                <RafflePage />
              </Route>
              </div>
            </> 
            
            : <Landing />}
          </Route>
          <Route exact path='/'>
            <div className="container">
              <div className="maintenance"></div>
            </div>
          </Route>
          
        </Switch>
      </Router>

    )
}

export default App;
