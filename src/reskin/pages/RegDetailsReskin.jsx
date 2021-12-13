import React, { useState, useEffect } from 'react'

import $ from 'jquery'
import '../../css/main.css';
import '../../js/jquery-ph-locations'
import '../../js/app'
import { useDispatch, useSelector } from "react-redux";
import { subscriberRegister, clearRegistrationAuth, showErrorMessage } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


import titleRegistration from "../../assets/title-registration.png";
import logoDito from "../../assets/logo-dito.png";

const Error = styled.div`
    color: red;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
`;

const loadCascading = () => {
  $("#region").on("click", function () {
    var region_code = $(this).val();
    $("#province").empty();
    $("#city").empty();
    $("#barangay").empty();
    $("#province").ph_locations("fetch_list", [{ region_code: region_code }]);
  });

  $("#region").on("change", function () {
    var region_code = $(this).val();
    $("#province").empty();
    $("#city").empty();
    $("#barangay").empty();
    $("#province").ph_locations("fetch_list", [{ region_code: region_code }]);
  });
  $("#province").on("change", function () {
    var province_code = $(this).val();
    $("#city").empty();
    $("#barangay").empty();
    $("#city").ph_locations("fetch_list", [{ province_code: province_code }]);
  });
  $("#city").on("change", function () {
    var city_code = $(this).val();
    $("#barangay").empty();
    $("#barangay").ph_locations("fetch_list", [{ city_code: city_code }]);
  });

  $("#region").ph_locations({ location_type: "regions" });
  $("#province").ph_locations({ location_type: "provinces" });
  $("#city").ph_locations({ location_type: "cities" });
  $("#barangay").ph_locations({ location_type: "barangays" });
  $("#region").ph_locations("fetch_list", [{ region_code: "13"}]);
  $("#province").ph_locations("fetch_list", [{ region_code: 13}]);
}

const RegDetailsReskin = () => {

  
  
  const dispatch = useDispatch();
  const history = useHistory();

  const { tempUser } = useSelector((state) => state.subscriber);
  const { error, errorMessage } = useSelector((state) => state?.subscriber);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [tnc, setTnc] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [emailValid, SetEmailValid] = useState(false);
  const[registerDisabled, setRegisterDisabled] = useState(true);


  
  const emailValidator = ( inputEmail ) => {
      let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail);
      SetEmailValid(isValid);
      setEmail(inputEmail)
      return isValid;
  }

  const isStringInputEmpty = (str) => {
    return !str.trim().length;
  }

  const validateForm =( ) => {
    const checkTNC = document.getElementById('checkTNC').checked;
    const checkPrivacy = document.getElementById('checkPrivacy').checked;

    
    const region = $('#region').find(":selected").val();
    const province = $('#province').find(":selected").val();
    const city = $('#city').find(":selected").val();
    const barangay = $('#barangay').find(":selected").val();

    if(isStringInputEmpty(name)) {
      showErrorMessage(dispatch, "Please provide your name!")
      return;
    }

    if(name.length < 8) {
      showErrorMessage(dispatch, "Full name too short!")
      return;
    }

    if (!emailValid) {
      console.log("invalid email")
      showErrorMessage(dispatch, "Invalid e-mail format!")
      return;
    }
    if(isStringInputEmpty(region) || isStringInputEmpty(province) || isStringInputEmpty(city) || isStringInputEmpty(street) ) {
      showErrorMessage(dispatch, "Please complete your address")
      return;
    }
    if(isStringInputEmpty(street) ){
      showErrorMessage(dispatch, "Please complete your address")
      return;
    }
    if (!checkTNC) {
      showErrorMessage(dispatch, "You must accept the Terms and Conditions")
      return;
    }
    if (!checkPrivacy) {
      showErrorMessage(dispatch, "You must agree to the Privacy Policy")
      return;
    }
    if ( emailValid && checkPrivacy && checkTNC ) {
      setRegisterDisabled(false);
    }
  }
  const clearDetails = (e) => {
    e.preventDefault();
    clearRegistrationAuth(dispatch)
  }

  const handleRegister = (e) => {
    e.preventDefault();
    validateForm();
    //PROCESS
    const region = $('#region').find(":selected").text();
    const province = $('#province').find(":selected").text();
    const city = $('#city').find(":selected").text();
    const barangay = $('#barangay').find(":selected").text();

    const addressNew = {
      street: street,
      barangay: barangay,
      city: city,
      province: province,
      region: region,
    }

    const consent = {
        tnc: tnc,
        privacy: privacy,
        marketing: marketing,
    }
    const { mobileNumber, password } = tempUser;
    console.log( mobileNumber)
    console.log( password)
    console.log(name)
    console.log(email)
    console.log(consent)
    console.log(addressNew)
    if(!registerDisabled) {
      subscriberRegister(dispatch, { mobileNumber, password, name, email, addressNew, consent });
      history.push("/welcomekadito");
    }

}
  
useEffect(() => {
  loadCascading();
}, [])
    return (
        <div className="register">
            <div className="container register-form" >
        <a href="/">
            <img className="title-registration" src={ titleRegistration } />
        </a>

        <div className="box-regform">
            <p>Ensure that <span>details</span> provided  are accurate <br/> as these will be used for the <span>redemption of prizes.</span></p>
          
            <div >
                <div className="form-group">
                
                    <label style={{ float: 'left' }}>Full Name</label>
                    <input type="text" className="form-control" id=""  maxLength="50" type="text" onChange={(e) => setName(e.target.value)} ></input>
                </div>

                <div className="form-group">
                    <label style={{ float: 'left' }}>Email Address</label >
                    <input type="email" className="form-control" id="" maxLength="50" type="email" onChange={(e) => emailValidator(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label style={{ float: 'left' }}>Region</label>
                    <select id="region"  className="form-select" aria-label="Select Region">
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ float: 'left' }}>Province</label>
                    <select id="province" className="form-select" aria-label="Select Province">
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ float: 'left' }}>City</label>
                    <select id="city" className="form-select" aria-label="Select City">
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ float: 'left' }}>Barangay</label>
                    <select id="barangay" className="form-select"  aria-label="Select Barangay">
                    </select>
                </div>

                <div className="form-group form-address">
                    <label style={{ float: 'left' }}>Address</label>
                    <p>Unit Number, House Number, Building Name, Street Name</p>
                    <input type="text" placeholder="Unit Number, House number, Building name, Street Name Barangay, City, Province, Region" className="form-control" id="" maxLength="50" type="text" onChange={(e) => setStreet(e.target.value)}></input>
                </div>

                <div className="form-check">
                    <input className="form-check-input" id="checkTNC"  type="checkbox"/>
                    <label className="form-check-label"  style={{ float: 'left' }}>I agree to <a href="https://dito.ph/terms-and-conditions?hsLang=en" target="_blank" className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Terms">DITO's Terms and Conditions</a></label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" id="checkPrivacy"  type="checkbox"/>
                    <label className="form-check-label" style={{ float: 'left' }} >I agree to <a href="https://dito.ph/privacy-policy?hsLang=en" target="_blank" className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Privacy">DITO's Privacy Policy</a></label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" id="checkMarketing" type="checkbox"/>
                    <label className="form-check-label" style={{ float: 'left' }}>I agree to <a className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Marketing">DITO Telecommunity marketing notifications</a></label>
                </div>
            </div>
            <Error hidden={error ? false : true }>{errorMessage}</Error>
            <button className="btn btn-red"  onClick={ (e) => handleRegister(e) } >REGISTER</button>
            <button className="btn btn-red"  onClick={ (e) => clearDetails(e) } >RE-ENTER MOBILE PHONE</button>
        </div>
        <img className="logo-dito" src={ logoDito }/>
    </div>

    {/* <!-- Modal Terms and Conditions--> */}
    <div className="modal fade" id="Terms" tabIndex="-1" aria-labelledby="TermsLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="TermsLabel">DITO's Terms and Conditions</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
        </div>
      </div>
    </div>

    {/* <!-- Modal Privacy Policy --> */}
    <div className="modal fade" id="Privacy" tabIndex="-1" aria-labelledby="PrivacyLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="PrivacyLabel">DITO's Privacy Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
        </div>
      </div>
    </div>

    {/* <!-- Modal Marketing Notifications --> */}
    <div className="modal fade" id="Marketing" tabIndex="-1" aria-labelledby="MarketingLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="MarketingLabel">DITO Telecommunity Marketing Notifications</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default RegDetailsReskin
