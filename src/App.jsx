import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch, useParams } from "react-router-dom";
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
import ResetPasswordReskin from "./reskin/pages/ResetPasswordReskin";
import VerifyEmailReskin from "./reskin/pages/VerifyEmailReskin";
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
            {/* <Route path='/verify/:userId' component={VerifyEmailReskin}/> */}
            <Route path='/verify'><Verify/></Route>
            <Route path='/reset/:userId/:resetString'>
                <ResetPasswordReskin />
            </Route>
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


          
        </Switch>
      </Router>

    )
}

function Verify() {
  let { path, url } = useRouteMatch();

  return(
    <div>
      <Switch>
        <Route exact path={path}>
          <LandingReskin/>
        </Route>
        <Route path={`${path}/:userId`}>
          <VerifyTwo />
        </Route>
      </Switch>
    </div>
  )
}

function VerifyTwo() {
  let { userId } = useParams();
  let { path, url } = useRouteMatch();
  console.log(userId)
  return(
    <div>
      <Switch>
        <Route exact path={path}>
          <LandingReskin/>
        </Route>
        <Route path={`${path}/:uniqueString`}>
          <VerifyEmailReskin />
        </Route>
      </Switch>
    </div>
  )
}

export default App;


