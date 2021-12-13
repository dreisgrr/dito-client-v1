import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePersonalInfo, updatePersonalPw, showErrorMessage, showErrorMessagePw, resetLoginError, resetPwErrors } from "../../redux/apiCalls";
import styled from "styled-components";
import $ from "jquery";

import '../../css/main.css';
import accountSetting from "../../assets/account_setting.png";
import footerBanner from "../../assets/registration-banner-footer.png";
import logoDito from "../../assets/logo-dito.png";

const Error = styled.div`
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    margin: 0 auto;
`;

const AccountsReskin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector((state) => state.subscriber?.currentUser);
    const { error, errorMessage } = useSelector((state) => state?.subscriber);
    const { errorPw, errorMessagePw } = useSelector((state) => state?.subscriber);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPw, setCurrentPw] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[passwordFormValidate, setPasswordFormValidate] = useState(false);
    const[personalInfoValidate, setPersonalInfoValidate] = useState(false)

    const emailValidator = ( inputEmail ) => {
        let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail);
        return isValid;
    }

    const isStringInputEmpty = (str) => {
        return !str.trim().length;
    }

    const validatePersonalInfo =( ) => {
        console.log(personalInfoValidate);
        if(isStringInputEmpty(name)) {
            showErrorMessage(dispatch, "Name is required")
            setPersonalInfoValidate(false)
            return;
          }
      
          if(name.length < 8) {
            showErrorMessage(dispatch, "Full name too short")
            setPersonalInfoValidate(false)
            return;
          }
          if(isStringInputEmpty(email)) {
            showErrorMessage(dispatch, "Email is required")
            setPersonalInfoValidate(false)
            return;
          }

          if(!emailValidator(email)) {
            showErrorMessage(dispatch, "Invalid e-mail format")
            setPersonalInfoValidate(false)
            return;
          }
          setPersonalInfoValidate(true)
    }

    const handleUpdateInfo =(e) => {
        console.log(personalInfoValidate);
        e.preventDefault();
        validatePersonalInfo();
        if(personalInfoValidate) {
            const mobileNumber = user.mobileNumber;
            updatePersonalInfo(dispatch, { mobileNumber, name, email });
            history.push("/account");
        }
        
    }

    const validatePassword =( ) => {
        if(isStringInputEmpty(currentPw)) {
            showErrorMessagePw(dispatch, "Please type your current password")
            setPersonalInfoValidate(false)
            return;
        }
        if(user.password != currentPw) {
            showErrorMessagePw(dispatch, "Incorrect current password")
            setPasswordFormValidate(false)
            return;
        }
      
        if(newPassword.length < 9) {
            showErrorMessagePw(dispatch, "Password should be at least 8 characters")
            setPasswordFormValidate(false)
            return;
        }
        let numberCheck = /\d/.test(newPassword)
        if(!numberCheck) {
            showErrorMessagePw(dispatch, "Passwords must have at least 1 number")
            setPasswordFormValidate(false)
            return;
        }
        let lowerCaseCheck = /(?=.*[a-z])/.test(newPassword)
        if(!lowerCaseCheck) {
            showErrorMessagePw(dispatch, "Passwords must have at least 1 lowercase letter")
            setPasswordFormValidate(false)
            return;
        }
        let uppperCaseCheck = /(?=.*[a-z])/.test(newPassword)
        if(!uppperCaseCheck) {
            showErrorMessagePw(dispatch, "Passwords must have at least 1 uppercase letter")
            setPasswordFormValidate(false)
            return;
        }
        if(newPassword !== confirmPassword) {
            showErrorMessagePw(dispatch, "Passwords do not match!")
            setPasswordFormValidate(false)
            return;
          }
          setPasswordFormValidate(true)
    }

    const handleUpdatePassword =(e) => {
        e.preventDefault();
        validatePassword();
        if(passwordFormValidate){
            const mobileNumber = user.mobileNumber;
            const password = newPassword
            updatePersonalPw(dispatch, { mobileNumber, password});
            history.push("/account");
        }
    }
    return (
        <div className="account">
            <div className="container register-content">
                
                <a>
                    <img className="title-registration" src={ accountSetting } />
                </a>
                <div className="small">
                    <div className="box-registration">
                        <h4>PROFILE</h4>
                        <br/>
                        <div className="input-group label">
                            <div className="block">
                                <label>Full Name</label>
                                <input type="text" className="form-control" onFocus={(e) => resetLoginError(dispatch)} placeholder={ user.name } onFocus={(e) => resetPwErrors(dispatch)} onChange={(e) => setName(e.target.value)} />
                                <br/>
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder={ user.email }  onChange={(e) => setEmail(e.target.value)} />
                                <br/>
                            </div>
                            <Error style={{ margin: '0 auto' }} hidden={error ? false : true }>{errorMessage}</Error>
			            </div>
                        <br/>
			            <a type="button" className="btn btn-blue" onClick={ (e) => handleUpdateInfo(e) } >UPDATE</a>
                    </div>
	            </div>
                <img className="foot-banner" src={ footerBanner } />
                <div className="big">
		            <div className="box-registration">
                        <h4>ADDRESS</h4>
                        <br/>
                        <div className="input-group label">
                            <div className="block">
				
                                <label>Region</label>
                                <input type="text" disabled className="form-control" placeholder="" />
                                <br/>
                                <label>Province</label>
                                <input type="text" disabled class="form-control" placeholder="" />
                                <br/>
                                <label>City</label>
                                <input type="text" disabled class="form-control" placeholder=""/>
                                <br/>
                                <label>Barangay</label>
                                <input type="text" disabled class="form-control" placeholder=""/>
                                <br/>
                                <label>Address</label>
                                <textarea  cols="40" disabled rows="5" className="form-control" />
                    
                                <p style={{fontSize: 10 + 'px'}}>Unit Number, House Number, Building Name, Street Name</p>
                            </div>
			            </div>
                        <br/>
                        <a type="button" class="btn btn-blue">UPDATE</a>
            
                    </div>
                </div>
                <img className="foot-banner" src={ footerBanner } />
                <div className="big">
                    <div className="box-registration">
                        <h4>UPDATE PASSWORD</h4>
                        <br/>
                        <div className="input-group label">
                            <div className="block">

                                <label>Current Password</label>
                                    <input type="password" className="form-control" placeholder="" onChange={(e) => setCurrentPw(e.target.value)}  />
                                    <br/>
				
                                <label>New Password</label>
			                    <input type="password" className="form-control" placeholder="" onChange={(e) => setNewPassword(e.target.value)} />
			                    <br/>
			   
			                    <p >Password Requirements</p>
			                    <ul >
                                    <li>At least one uppercase (A-Z)</li>
                                    <li>At least one lowercase (a-z)</li>
                                    <li>At least one number (0-9)</li>  
                                    <li>Minimum 8 characters</li>  
                                </ul>

			                    <label>Confirm Password</label>
			                     <input type="password" className="form-control" placeholder="" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
			            </div>
                        <Error style={{ margin: '0 auto' }} h hidden={errorPw ? false : true }>{errorMessagePw}</Error>
                        <br/>
			            <a type="button" className="btn btn-blue" onClick={ (e) => handleUpdatePassword(e) } >UPDATE</a>
                     </div>
	            </div>
                <img className="foot-banner" src={ footerBanner } />
                <img class="logo-dito" src={ logoDito }  style={{ paddingBottom: 20 + 'px' }} />

            </div>
        </div>
    )
}

export default AccountsReskin
