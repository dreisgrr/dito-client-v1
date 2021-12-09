import React, {useState, useEffect} from 'react'

import '../../css/main.css';
import { useDispatch, useSelector } from "react-redux";
import { subscriberRegister } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";

import TNC from '../../reskin/components/TNC';

import titleRegistration from "../../assets/title-registration.png";
import logoDito from "../../assets/logo-dito.png";

const RegDetailsReskin = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const { tempUser } = useSelector((state) => state.subscriber);

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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValid, SetEmailValid] = useState(false);
  

  const emailValidator = ( inputEmail ) => {
      let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
      SetEmailValid(isValid);
      return isValid;
  }

  const handleRegister = (e) => {
    console.log("handleRegister");
    e.preventDefault();
    //VALIDATE
    // if(!emailIsValid(email)) {
    //     invalidEmailError(dispatch)
    // }

    //PROCESS
   // const address = `${street} ${barangay} ${city} ${province} ${region}`;
   const address = `${street}`;
    const consent = {
        tnc: tnc,
        privacy: privacy,
        marketing: marketing,
    }
    const { mobileNumber, password } = tempUser;
    subscriberRegister(dispatch, { mobileNumber, password, name, email, address, consent });
    history.push("/reskin/welcomekadito");
}
  
    return (
        <div className="register">
            <div className="container register-form" >
        <a href="/reskin">
            <img className="title-registration" src={ titleRegistration } />
        </a>

        <div className="box-regform">
            <p>Ensure that <span>details</span> provided  are accurate <br/> as these will be used for the <span>redemption of prizes.</span></p>
          
            <form>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" id=""  maxLength="50" type="text" onChange={(e) => setName(e.target.value)} ></input>
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" id="" maxLength="50" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label>Region</label>
                    <select className="form-select" id="" aria-label="Select Region">
                        <option> </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Province</label>
                    <select className="form-select" id="" aria-label="Select Province">
                        <option> </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <select className="form-select" id="" aria-label="Select City">
                        <option> </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Barangay</label>
                    <select className="form-select" id="" aria-label="Select Barangay">
                        <option> </option>
                    </select>
                </div>

                <div className="form-group form-address">
                    <label>Address</label>
                    <p>Unit Number, House Number, Building Name, Street Name</p>
                    <input type="text" className="form-control" id="" maxLength="50" type="text" onChange={(e) => setStreet(e.target.value)}></input>
                </div>

                <div className="form-check">
                    <input className="form-check-input" checked type="checkbox"/>
                    <label className="form-check-label">I agree to <a href="https://dito.ph/terms-and-conditions?hsLang=en" target="_blank" className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Terms">DITO's Terms and Conditions</a></label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" checked type="checkbox"/>
                    <label className="form-check-label" >I agree to <a href="https://dito.ph/privacy-policy?hsLang=en" target="_blank" className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Privacy">DITO's Privacy Policy</a></label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" checked type="checkbox"/>
                    <label className="form-check-label">I agree to <a className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#Marketing">DITO Telecommunity marketing notifications</a></label>
                </div>
            </form>

            <a type="button" className="btn btn-red" onClick={ (e) => handleRegister(e) } >REGISTER</a>
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
