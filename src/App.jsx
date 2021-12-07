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
    return(
      // <Router>
      //   <Switch>
      //     <Route exact path='/landing'>
      //       {subscriber ? <Redirect to='/' /> : <Landing />}
      //     </Route>
      //     <Route exact path='/register'>
      //       {subscriber ? <Redirect to='/' /> : <RegisterThruPW />}
      //     </Route>
      //     <Route exact path='/login'>
      //       {subscriber ? <Redirect to='/' /> : <LoginPW />}
      //     </Route>
      //     <Route exact path='/regDetails'>
      //       {auth ? <RegDetails /> : <Redirect to='/' />}
      //     </Route>
      //     <Route exact path='/'>
      //       {subscriber ?
      //       <>
      //         <Topbar/>
      //         <div className="container">
      //         <Route exact path='/'>
      //           <RafflePage />
      //         </Route>
      //         </div>
      //       </> 
            
      //       : <Landing />}
      //     </Route>
          
      //   </Switch>
      // </Router>
      <div className="container">
          {/* <DITOLogo/> */}
          <div className="maintenance"></div>

      </div>
    )
}

export default App;
