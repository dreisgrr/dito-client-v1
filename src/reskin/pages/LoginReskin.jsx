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
    const [isValid, setIsValid] = useState("");

    const { error, errorMessage } = useSelector((state) => state?.subscriber);

    const handleLogin = (e) => {
        e.preventDefault();
        subscriberLoginPW(dispatch, { mobileNumber, password });
    }

    const resetError = (mobileNumber) => {
        setIsValid(validatePhone(mobileNumber))
        setMobileNumber(mobileNumber);
    } 

    const validatePhone = (phone) => {
        return phone.match(
            /^(9|\+639)\d{9}$/
        );
    }

    return (
        <div className="login">
            <div className="container login-content">
                <a href="/">
                    <img className="title-login" src={ titleLogin } />
                </a>

                <div className="box-login">
                    <p>Input your DITO Number</p>
                    <Error hidden={error ? false : true }>{errorMessage}</Error>
                    <div className="input-group">
                        <img className="box-mobile" src={ boxMobile } />
                        <span className="input-group-text">+63</span>
                        <input type="tel" className="form-control" placeholder="991 000 0000" maxLength="10"  onFocus={(e) => resetLoginError(dispatch)} onChange={(e)=>resetError(e.target.value)} />
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
