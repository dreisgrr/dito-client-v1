import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Landing from "./subscriber/pages/Landing";
import Register from "./subscriber/pages/Register";
import Login from "./subscriber/pages/Login";
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
  const auth = useSelector((state) => state.subscriber?.isAuthenticated);
    return(
      // <Router>
      //   <Switch>
      //     <Route exact path='/landing'>
      //       {subscriber ? <Redirect to='/' /> : <Landing />}
      //     </Route>
      //     <Route exact path='/register'>
      //       {subscriber ? <Redirect to='/' /> : <Register />}
      //     </Route>
      //     <Route exact path='/login'>
      //       {subscriber ? <Redirect to='/' /> : <Login />}
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
          <DITOLogo/>

      </div>
    )
}

export default App;
