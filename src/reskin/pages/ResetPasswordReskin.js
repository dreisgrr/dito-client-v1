import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";

import "../../css/main.css";

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

const ResetPasswordReskin = () => {
  const dispatch = useDispatch();
  const { userId, resetString } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordFormValidate, setPasswordFormValidate] = useState(false);

  const isStringInputEmpty = (str) => {
    return !str.trim().length;
  };

  const validatePassword = () => {
    console.log(passwordFormValidate);
    if (isStringInputEmpty(newPassword)) {
      setError(true);
      setErrorMessage("Password is required");
      setPasswordFormValidate(false);
      return;
    }
    if (newPassword.length < 9) {
      setError(true);
      setErrorMessage("Password should be at least 8 characters");
      setPasswordFormValidate(false);
      return;
    }
    let numberCheck = /\d/.test(newPassword);
    if (!numberCheck) {
      setError(true);
      setErrorMessage("Passwords must have at least 1 number");
      setPasswordFormValidate(false);
      return;
    }
    let lowerCaseCheck = /(?=.*[a-z])/.test(newPassword);
    if (!lowerCaseCheck) {
      setError(true);
      setErrorMessage("Passwords must have at least 1 lowercase letter");
      setPasswordFormValidate(false);
      return;
    }
    let uppperCaseCheck = /(?=.*[A-Z])/.test(newPassword);
    if (!uppperCaseCheck) {
      setError(true);
      setErrorMessage("Passwords must have at least 1 uppercase letter");
      setPasswordFormValidate(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError(true);
      setErrorMessage("Passwords do not match!");
      setPasswordFormValidate(false);
      return;
    }
    setError(false);
    setErrorMessage("");
    setPasswordFormValidate(true);
    console.log(passwordFormValidate);
  };

  const handleResetPassword = async (e) => {
    validatePassword();
    console.log(passwordFormValidate);
    if (passwordFormValidate) {
      console.log(newPassword);
      console.log(confirmNewPassword);
      console.log(userId);
      console.log(resetString);
      const params = {
        userId,
        resetString,
        newPassword,
      };
      try {
        const res = await publicRequest.post(
          "/auth/subscriber/resetPassword",
          params
        );
        const { data } = res;
        console.log(data);
        if (data.status == "SUCCESS") {
          $("#pwMessage").text(
            "Password reset request was sent successfully. Please check your email."
          );
          $("#changepass").modal("show");
          $("#fpMobileNumber").prop("disabled", true);
          $("#fpEmail").prop("disabled", true);
        } else {
          setError(true);
          const message = data.message;
          setErrorMessage(message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='login'>
      <div className='container login-content'>
        <a href='/'>
          <img className='title-login' src={titleLogin} />
        </a>

        <div className='box-login box-reset'>
          <p className='newpass-label'>Type your new Password</p>

          <div className='form-group'>
            <label>New Password</label>
            <div className='input-group' id='show_hide_newpassword'>
              <input
                className='form-control'
                placeholder='**********'
                type='password'
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyUp={validatePassword}
              />
              <div className='input-group-addon'>
                <a href=''>
                  <i className='fa fa-eye-slash' aria-hidden='true'></i>
                </a>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label>Confirm Password</label>
            <div className='input-group' id='show_hide_confirmpassword'>
              <input
                className='form-control'
                placeholder='**********'
                type='password'
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onKeyUp={validatePassword}
              />
              <div className='input-group-addon'>
                <a href=''>
                  <i className='fa fa-eye-slash' aria-hidden='true'></i>
                </a>
              </div>
            </div>
          </div>

          <div className='pass-req'>
            <p>New Password must contain</p>
            <p>1 letter, 1 number, 1 special character and no space</p>
          </div>

          <div className='pass-req'>
            <Error hidden={error ? false : true}>{errorMessage}</Error>
          </div>

          <input
            className='btn btn-red modal-link'
            type='button'
            onClick={handleResetPassword}
            value='SUBMIT'
          />
        </div>
        <img className='logo-dito' src={logoDito} />
      </div>
      <div
        className='modal fade sendlink'
        id='changepass'
        tabIndex='-1'
        aria-labelledby='changepassLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body'>
              <h5>Password reset successful!</h5>

              <a href='/login' type='button' className='btn btn-red'>
                Continue
              </a>
              <img className='bg-footer' src={bgFooter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordReskin;
