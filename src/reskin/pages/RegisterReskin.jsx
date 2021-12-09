import React from 'react'
import { useEffect, useState } from "react";
import { sunscriberNotExistsPW, resetLoginError, showErrorMessage } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import '../../css/main.css';

import titleRegistration from "../../assets/title-registration.png";
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

const RegisterReskin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState("");

    const { error, errorMessage, isNewUser, tempUser } = useSelector((state) =>  state.subscriber);

    const handleRegister = (e) => {
        e.preventDefault();
        if(!isValid)  {
            showErrorMessage(dispatch, "Invalid phone number")
            return;
        }
        sunscriberNotExistsPW(dispatch, { mobileNumber, password });
    }


    const resetError = (formMobileNumber) => {
        setIsValid(validatePhone(formMobileNumber))
        setMobileNumber(formMobileNumber);    

    } 

    const validatePhone = (phone) => {
        return phone.match(
            /^(9|\+639)\d{9}$/
        );
    }

    useEffect(() => {
        if( isNewUser || tempUser ){
            history.push("/reskin/regDetails");
        }
    }, [isNewUser])

    return (
        <div className="register">
            <div className="container register-content">
                <a href="/reskin">
                    <img className="title-registration" src={ titleRegistration } />
                </a>

                <div className="box-registration">
                    <p>Input your Dito Number</p>
                    <Error hidden={error ? false : true }>{errorMessage}</Error>
                    <div className="input-group">
                        <img className="box-mobile" src={ boxMobile }/>
                        <span className="input-group-text">+63</span>
                        <input type="tel" className="form-control" placeholder="912 345 678" maxLength="10"  onFocus={(e) => resetLoginError(dispatch)} onInput={(e) => resetError(e.target.value)} />
                    </div>
                    <div className="input-group" style={{marginTop: 25 + 'px'}}>
                        <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>

                    <div className="form-check">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label">Remember Me</label>
                    </div>

                    <a type="button" onClick={ handleRegister } className="btn btn-blue">PROCEED</a>
                    
                </div>

                <img className="logo-dito" src={ logoDito }/>
            </div>
        </div>
    )
}

export default RegisterReskin
