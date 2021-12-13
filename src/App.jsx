import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
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
import TopbarReskin from './reskin/components/TopbarReskin';
import RafflePageReskin from './reskin/pages/RafflePageReskin';
import FAQsReskin from './reskin/pages/FAQsReskin';
import FooterReskin from './reskin/components/FooterReskin';
import AccountsReskin from "./reskin/pages/AccountsReskin";
import './js/app'

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
    localStorage.clear();
  }
  let auth = useSelector((state) => state.subscriber?.isNewUser);
  //auth = true;
  // const subscriber = true;
    return(
      <Router>
          <Switch>
          {/* LOCAL */}
              <Route exact path='/landing'>
            {subscriber ? <Redirect to='/' /> : <LandingReskin />}
          </Route>
          <Route exact path='/register'>
            {subscriber ? <Redirect to='/' /> : <RegisterReskin />}
          </Route>
          <Route exact path='/login'>
            {subscriber ? <Redirect to='/' /> : <LoginReskin />}
          </Route>
          <Route exact path='/regDetails'>
            {auth ? <RegDetailsReskin /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/welcomekadito'>
            {auth ? <SplashReskin /> : <Redirect to='/' />}
          </Route>
            {subscriber && (
            <>
              <TopbarReskin/>
              <div className="home-page-container">
                <Route  path='/raffle'>
                  <RafflePageReskin />
                </Route>
                <Route path='/faqs'>
                  <FAQsReskin />
                </Route>
                <Route path='/account'>
                  <AccountsReskin />
                </Route>
                <Route  exact path='/'>
                  <RafflePageReskin />
                </Route>
              </div>
              <FooterReskin/>
            </>
            )}
          <Route path='/'>
            <LandingReskin />
          </Route>

              {/* PROD ROUTE */}
                {/* <Route exact path='/landing'>
                  {subscriber ? <Redirect to='/' /> : <Landing />}
                </Route>
                <Route exact path='/register'>
                  {subscriber ? <Redirect to='/' /> : <RegisterThruPW />}
                </Route>
                <Route exact path='/login'>
                  {subscriber ? <Redirect to='/' /> : <LoginPW />}
                </Route>
                <Route exact path='/regDetails'>
                  {auth ? <RegDetails /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/'>
                  {subscriber ?
                  <>
                    <Topbar/>
                    <div className="container">
                    <Route exact path='/'>
                      <RafflePage />
                    </Route>
                    </div>
                  </> 
                  
                  : <Landing />}
                </Route> */}


          
          {/* Reskin */}
          {/* <Route exact path='/reskin/landing'>
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
          </Route> */}

          {/* Current */}
          {/* <Route exact path='/current/landing'>
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
          </Route> */}

              {/* MAINTENANCE */}
          {/* <Route exact path='/'>
            <div className="container">
              <div className="maintenance"></div>
            </div>
          </Route> */}
          
        </Switch>
      </Router>

    )
}

export default App;
