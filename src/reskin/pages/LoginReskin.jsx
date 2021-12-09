import React from 'react'
import { useEffect, useState } from "react";
import { resetLoginError, subscriberLoginPW} from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import '../../css/main.css';

import titleLogin from "../../assets/title-login.png";
import boxMobile from "../../assets/box-mobile.png";
import logoDito from "../../assets/logo-dito.png";

const Error = styled.div`
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    margin-top: -50px;
	position:fixed;
`;

const LoginReskin = () => {

    const dispatch = useDispatch();
    const [ mobileNumber, setMobileNumber ] = useState('');
    const [ password, setPassword ] = useState("");

    const { error, errorMessage } = useSelector((state) => state?.subscriber);

    const handleLogin = (e) => {
        e.preventDefault();
        subscriberLoginPW(dispatch, { mobileNumber, password });
    }

    const resetError = (mobileNumber) => {
        setMobileNumber(mobileNumber);
    } 

    return (
        <div className="login">
            <div className="container login-content">
                <a href="/reskin">
                    <img className="title-login" src={ titleLogin } />
                </a>

                <div className="box-login">
                    <p>Input your Dito Number</p>
                    <Error hidden={error ? false : true }>{errorMessage}</Error>
                    <div className="input-group">
                        <img className="box-mobile" src={ boxMobile } />
                        <span className="input-group-text">+63</span>
                        <input type="tel" className="form-control" placeholder="912 345 678" onFocus={(e) => resetLoginError(dispatch)} onChange={(e)=>resetError(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Remember Me</label>
                    </div>

                    <a type="button" className="btn btn-red" onClick={ handleLogin } >LOGIN</a>
                    
                </div>

                <img className="logo-dito" src={ logoDito } />
            </div>
        </div>
    )
}

export default LoginReskin
