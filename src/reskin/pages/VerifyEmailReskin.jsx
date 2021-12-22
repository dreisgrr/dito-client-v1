import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import $ from "jquery"

import "../../css/main.css";

import titleLogin from "../../assets/title-login.png";
import logoDito from "../../assets/logo-dito.png";

const VerifyEmailReskin = () => {
  const { userId, uniqueString } = useParams();
  const params = {
      userId,
      uniqueString
  }


    useEffect( async() => {
        try {
        const res = await publicRequest.post(
          "/auth/subscriber/verifyEmail",
          params
        );
        const { data } = res;
        const message = data.message
        $("#emailMessage").text(message);
      } catch (err) {
        console.log(err);
      }
    }, [])

    return (
        <div className='login'>
            <div className='container login-content'>
                <a href='/'>
                    <img className='title-login' src={titleLogin} />
                </a>

                <div className='box-login box-reset box-verify'>
                <p className='newpass-label'>Email Verification</p>
                

                <div className='pass-req'>
                    <p id="emailMessage"></p>
                </div>

                <div className='pass-req'>
                </div>

                <a
                    href="/login"
                    className='btn btn-red modal-link'
                    type='button'
                >OK</a>
            </div>
            <img className='logo-dito' src={logoDito} />
        </div>
    </div>
    )
}

export default VerifyEmailReskin
