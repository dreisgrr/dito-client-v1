import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';

import '../../css/main.css';

import logoLoadedkadito from "../../assets/logo-loadeddito.png";
import logoDito from "../../assets/logo-dito.png";

const LandingReskin = () => {
    return (
        <div className="home">
            <div className="container home-content">
                <img className="logo-loadeddito" src={ logoLoadedkadito }/>
                <Link className={"btn btn-red "}  to={"/reskin/register"} >REGISTER NOW</Link>
                <Link className={"btn btn-blue "}  to={"/reskin/login"} >LOGIN</Link>
                <img className="logo-dito" src={ logoDito }/>
            </div>
            
        </div>
    )
}

export default LandingReskin
