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
    justify-content: left;
    align-items: center;
    font-size: 12px;
    padding-top: 10px;
`;

const RegisterReskin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isValid, setIsValid] = useState("");
    const[passwordFormValidate, setPasswordFormValidate] = useState(false);

    const { error, errorMessage, isNewUser, tempUser } = useSelector((state) =>  state.subscriber);

    const isStringInputEmpty = (str) => {
        return !str.trim().length;
    }

    const validatePassword = () => {
        if(!isValid)  {
            showErrorMessage(dispatch, "Invalid phone number!")
            return;
        }
        if(isStringInputEmpty(password)) {
            showErrorMessage(dispatch, "Password is required")
            setPasswordFormValidate(false)
            return;
        }
        if(password.length < 9) {
            showErrorMessage(dispatch, "Password should be at least 8 characters")
            setPasswordFormValidate(false)
            return;
        }
        let numberCheck = /\d/.test(password)
        if(!numberCheck) {
            showErrorMessage(dispatch, "Passwords must have at least 1 number")
            setPasswordFormValidate(false)
            return;
        }
        let lowerCaseCheck = /(?=.*[a-z])/.test(password)
        if(!lowerCaseCheck) {
            showErrorMessage(dispatch, "Passwords must have at least 1 lowercase letter")
            setPasswordFormValidate(false)
            return;
        }
        let uppperCaseCheck = /(?=.*[A-Z])/.test(password)
        if(!uppperCaseCheck) {
            showErrorMessage(dispatch, "Passwords must have at least 1 uppercase letter")
            setPasswordFormValidate(false)
            return;
        }
        if(password !== confirmPassword) {
            showErrorMessage(dispatch, "Passwords do not match!")
            setPasswordFormValidate(false)
            return;
          }
          setPasswordFormValidate(true)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        validatePassword();
        if(passwordFormValidate) {
            sunscriberNotExistsPW(dispatch, { mobileNumber, password });
        }
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
            history.push("/regDetails");
        }
    }, [isNewUser])

    return (
        <div className="register">
            <div className="container register-content">
                <a href="/">
                    <img className="title-registration" src={ titleRegistration } />
                </a>

                <div className="box-registration">
                    <p>Input your DITO Number</p>
                    
                    <div className="input-group">
                        <img className="box-mobile" src={ boxMobile }/>
                        <span className="input-group-text">+63</span>
                        <input type="tel" className="form-control" placeholder="991 000 0000" maxLength="10"  onFocus={(e) => resetLoginError(dispatch)} onInput={(e) => resetError(e.target.value)} />
                    </div>
                    <p className="label-password">Password</p>
                    <div className="input-group">
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
                    </div>

                    <p className="label-password">Confirm Password</p>
                    <div className="input-group">
                        <input type="password" className="form-control" onChange={(e) =>setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="form-check">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label">Remember Me</label>
                    <Error hidden={error ? false : true }>{errorMessage}</Error>
                    </div>
                    <a type="button" onClick={ handleRegister } className="btn btn-blue">PROCEED</a>
                    
                </div>

                <img className="logo-dito" src={ logoDito }/>
            </div>
        </div>
    )
}

export default RegisterReskin
