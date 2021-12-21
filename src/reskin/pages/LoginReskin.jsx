import React from 'react'
import { useEffect, useState } from "react";
import { resetLoginError, subscriberLoginPW} from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods"
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import 'bootstrap/dist/js/bootstrap.js'
import $ from "jquery"

import '../../css/main.css';

import titleLogin from "../../assets/title-login.png";
import boxMobile from "../../assets/box-mobile.png";
import logoDito from "../../assets/logo-dito.png";
import bgFooter from "../../assets/registration-banner-footer.png";

const Error = styled.div`
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    padding-top: 10px;
`;

const LoginReskin = () => {

    const dispatch = useDispatch();
    const [ mobileNumber, setMobileNumber ] = useState('');
    const [ password, setPassword ] = useState("");
    const [ forgotNumber, setForgotNumber ] = useState("");
    const [ email, setEmail ] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [emailValid, SetEmailValid] = useState(false);
    const [forgotFormValidate, setforgotFormValidate] = useState(false);
    const [errorFP, setErrorFP] = useState(false);
    const [errorMessageFP, setErrorMessageFP] = useState("");

    const { error, errorMessage } = useSelector((state) => state?.subscriber);

    const handleLogin = (e) => {
        e.preventDefault();
        subscriberLoginPW(dispatch, { mobileNumber, password });
    }

    const resetError = (mobileNumber) => {
        setIsValid(validatePhone(mobileNumber))
        setMobileNumber(mobileNumber);
    } 

    const resetErrorFP = (mobileNumber) => {
        setIsValid(validatePhone(mobileNumber))
        setForgotNumber(mobileNumber);
    } 

    const validatePhone = (phone) => {
        return phone.match(
            /^(9|\+639)\d{9}$/
        );
    }

    const isStringInputEmpty = (str) => {
        return !str.trim().length;
    }

    const emailValidator = ( email ) => {
        let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        SetEmailValid(isValid);
        setEmail(email)
        return isValid;
    }

    const validateFPForm = () => {
        if(!isValid)  {
         $('#pwMessage').text('Invalid phone number');
            return;
        }
        $('#pwMessage').text('');
        console.log(forgotFormValidate);
        if(isStringInputEmpty(email)) {
         $('#pwMessage').text('Email is required');
        setforgotFormValidate(false);
        return;
        }

        if (!emailValid) {
         $('#pwMessage').text('The email you entered is invalid');
        setforgotFormValidate(false);
        return;
        }
        setforgotFormValidate(true);
        console.log(forgotFormValidate);
    }

    const handleRequestReset = async (e) => {
        e.preventDefault();
        console.log(forgotFormValidate);
        if (forgotFormValidate) {
            $('#pwMessage').text('Requesting Password Reset...');
            const redirectUrl = "https://loadedkadito.ph/reset";
            const mobileNumber = forgotNumber;
            const params = {
                mobileNumber, email, redirectUrl
            }
            console.log(params);
            try {
                const res = await publicRequest.post("/auth/subscriber/requestPasswordReset", params);
                const { data } = res;
                console.log(data)
                if ( data.status == "PENDING") {
                    $('#pwMessage').text('Password reset request was sent successfully. Please check your email.');
                    $('#pwResetBtn').prop('disabled', true)
                    $('#fpMobileNumber').prop('disabled', true)
                    $('#fpEmail').prop('disabled', true)
                }
                else {
                    $('#pwMessage').text(data.messsage);
                }
            }
            catch(err) {
                console.log(err)
            }
        }
        
    }

    return (
        <div className="login">
            <div className="container login-content">
                <a href="/">
                    <img className="title-login" src={ titleLogin } />
                </a>

                <div className="box-login">
                    <p>Input your DITO Number</p>
                    <div className="input-group">
                        <img className="box-mobile" src={ boxMobile } />
                        <span className="input-group-text">+63</span>
                        <input type="tel" className="form-control" placeholder="991 000 0000" maxLength="10"  onFocus={(e) => resetLoginError(dispatch)} onChange={(e)=>resetError(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="forgot-group">
                        <a className="forgotpass modal-link" type="button"data-bs-toggle="modal" data-bs-target="#forgotPass">Forgot Password?</a>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">Remember Me</label>
                        </div>
                    </div>
                    <Error hidden={error ? false : true }>{errorMessage}</Error>
                    <a type="button" className="btn btn-red" onClick={ handleLogin } >LOGIN</a>
                    
                </div>

                <img className="logo-dito" src={ logoDito } />
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade sendlink" id="forgotPass" tabIndex="-1" aria-labelledby="forgotPassLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-body">
                        <h5> A link will be sent to your email to <br/> reset your password</h5>
                        <p id="pwMessage">Kindly provide the following: </p>
                        
                        <div className="form-group">
                            <label>DITO number</label>
                            <input type="tel" className="form-control" id="fpMobileNumber" maxLength="10" placeholder="991 000 0000" onChange={(e)=>resetErrorFP(e.target.value)}  />
                            <label>Email Address</label>
                            <input type="email" className="form-control" id="fpEmail" onKeyUp={validateFPForm} onChange={(e) => emailValidator(e.target.value)} />
                        </div>
                        <input type="button" value="SEND LINK TO EMAIL" id="pwResetBtn" onKeyUp={validateFPForm}  className="btn btn-red" onClick={ handleRequestReset } />
                            {/* SEND LINK TO EMAIL */}
                        <img className="bg-footer" src={ bgFooter } />
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginReskin
