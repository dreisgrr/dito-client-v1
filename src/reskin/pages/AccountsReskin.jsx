import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePersonalInfo, updatePersonalPw, showErrorMessage, showErrorMessagePw, showErrorMessageAddress, resetAccountPageErrors, resetPwErrors, updatePersonalAddress } from "../../redux/apiCalls";
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
    font-size: 16px;
    font-weight: 600;
`;

const AccountsReskin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector((state) => state.subscriber?.currentUser);
    const { error, errorMessage } = useSelector((state) => state?.subscriber);
    const { errorPw, errorMessagePw } = useSelector((state) => state?.subscriber);
    const { errorAddress, errorMessageAddress } = useSelector((state) => state?.subscriber);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPw, setCurrentPw] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const[passwordFormValidate, setPasswordFormValidate] = useState(false);
    const[personalInfoValidate, setPersonalInfoValidate] = useState(false)
    const[addressFormValidate, setAddressFormValidate] = useState(false)

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
            showErrorMessage(dispatch, "The email you entered is invalid")
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
            $('#nameField').val('')
            $('#emailField').val('')
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
        if(newPassword  == currentPw) {
            showErrorMessagePw(dispatch, "New password should be the same with your current password")
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

    const validateAddress = () => {
        console.log("inside validate")
        if(isStringInputEmpty(street)) {
            showErrorMessageAddress(dispatch, "Address is required")
            setAddressFormValidate(false)
            return;
        }
        if(street.length < 15) {
            showErrorMessageAddress(dispatch, "Address information too short")
            setAddressFormValidate(false)
            return;
        }
        setAddressFormValidate(true)
    }

    const handleUpdatePassword =(e) => {
        e.preventDefault();
        validatePassword();
        if(passwordFormValidate){
            const mobileNumber = user.mobileNumber;
            const password = newPassword
            updatePersonalPw(dispatch, { mobileNumber, password});
            $('#currentPwField').val('')
            $('#newPwField').val('')
            $('#confirmPwField').val('')
            history.push("/account");
        }
    }
    const handleUpdateAddress = (e) => {
        e.preventDefault();
        console.log("afer validate")
        validateAddress();
        console.log("afer validate")
        if(addressFormValidate){
            console.log("validated address")
            const mobileNumber = user.mobileNumber;
            const address = street
            updatePersonalAddress(dispatch, { mobileNumber, address});
            $('#addressStreet').val('')
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
                        <div className="input-group label">
                            <div className="block">
                                <label>Full Name</label>
                                <input type="text" id="nameField" className="form-control" onFocus={(e) => resetAccountPageErrors(dispatch)} placeholder={ user.name } onFocus={(e) => resetPwErrors(dispatch)} onChange={(e) => setName(e.target.value)} />
                                <br/>
                                <label>Email Address</label>
                                <input type="email" id="emailField" className="form-control" onFocus={(e) => resetAccountPageErrors(dispatch)}  placeholder={ user.email }  onChange={(e) => setEmail(e.target.value)} />
                                <br/>
                            </div>
			            </div>
                        <br/>
			            <a type="button" className="btn btn-blue" onClick={ (e) => handleUpdateInfo(e) } >UPDATE PROFILE</a>
                            <Error style={{ margin: '0 auto' }} hidden={error ? false : true }>{errorMessage}</Error>
                    </div>
	            </div>
                <img className="foot-banner" src={ footerBanner } />
                <div className="small">
		            <div className="box-registration">
                        <h4>ADDRESS</h4>
                        <div className="input-group label">
                            <div className="block">
				
                                {/* <label>Region</label>
                                <input type="text" disabled className="form-control" placeholder="Disabled" />
                                <br/>
                                <label>Province</label>
                                <input type="text" disabled class="form-control" placeholder="Disabled" />
                                <br/>
                                <label>City</label>
                                <input type="text" disabled class="form-control" placeholder="Disabled"/>
                                <br/>
                                <label>Barangay</label>
                                <input type="text" disabled class="form-control" placeholder="Disabled"/>
                                <br/> */}
                                <label>Complete Address</label>
                                <p style={{fontSize: 14 + 'px'}}>House Number, Street, Barangay, City, Province, Postal Code</p>
                                <textarea id="addressStreet"  onFocus={(e) => resetAccountPageErrors(dispatch)}   cols="40" placeholder={ user.address ? user.address : 'House Number, Street, Barangay, City, Province, Postal Code' } maxLength="80" rows="5" className="form-control" onChange={ (e) => setStreet(e.target.value) } />
                    
                            </div>
			            </div>
                        <a type="button" className="btn btn-blue" onClick={ (e) => handleUpdateAddress(e) } >UPDATE ADDRESS</a>
                        <Error style={{ margin: '0 auto' }} h hidden={errorAddress ? false : true }>{errorMessageAddress}</Error>
                                
                    </div>
                </div>
                <img className="foot-banner" src={ footerBanner } />
                <div className="med">
                    <div className="box-registration">
                        <h4>UPDATE PASSWORD</h4>
                        <div className="input-group label">
                            <div className="block">

                                <label>Current Password</label>
                                    <input type="password" id="currentPwField" onFocus={(e) => resetAccountPageErrors(dispatch)}  className="form-control" placeholder="" onChange={(e) => setCurrentPw(e.target.value)}  />
                                    <br/>
				
                                <label>New Password</label>
			                    <input type="password" id="newPwField" onFocus={(e) => resetAccountPageErrors(dispatch)}  className="form-control" placeholder="" onChange={(e) => setNewPassword(e.target.value)} />
			                    <br/>
			   
			                    <p  style={{fontSize: 14 + 'px'}}>Password Requirements</p>
			                    <ul style={{fontSize: 14 + 'px'}}>
                                    <li>At least one uppercase (A-Z)</li>
                                    <li>At least one lowercase (a-z)</li>
                                    <li>At least one number (0-9)</li>  
                                    <li>Minimum 8 characters</li>  
                                </ul>

			                    <label>Confirm Password</label>
			                     <input type="password" id="confirmPwField" onFocus={(e) => resetAccountPageErrors(dispatch)}  className="form-control" placeholder="" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
			            </div>
			            <a type="button" className="btn btn-blue" onClick={ (e) => handleUpdatePassword(e) } >UPDATE PASSWORD</a>
                        <Error style={{ margin: '0 auto' }} h hidden={errorPw ? false : true }>{errorMessagePw}</Error>
                     </div>
	            </div>
                <img className="foot-banner" src={ footerBanner } />
                <img class="logo-dito" src={ logoDito }  style={{ paddingBottom: 20 + 'px' }} />

            </div>
        </div>
    )
}

export default AccountsReskin
