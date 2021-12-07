import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import ditoLogo from "../../assets/img/logo.png";
import { subscriberRegister, sunscriberOTPVerified, subscriberGenerateOTP } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f8f8f8 0% 0% no-repeat padding-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    min-width: 50%;
    padding: 20px;
`;
const DITOLogo = styled.div`
    width: 140px;
    height: 140px;
    background-image: url(${ditoLogo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
    margin: 0 auto;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    max-width: 60%;
    margin: 0 auto;
`;
const Title = styled.h1`
    font-size: 28px;
    font-weight: 400;
    text-align: center;
`;
const Input = styled.input`
    flex: 1;
    min-width: 50%;
    width: 100%
    line-height: 30px;
    margin-top: 20px;
    padding: 10px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 3px #0000001A;
    border-radius: 6px;
    opacity: 1;
    border: none;
    margin-bottom: 7%;
    transition:background-color 0.5s ease;
    font-size: 20px;
`;
const Button = styled.button`
    width: 77%;
    border: none;
    padding: 15px 30px;
    background: #E00019 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 6px #0000001A;
    border-radius: 10px;
    opacity: 1;
    color: white;
    cursor: pointer;
    text-align: center;
    letter-spacing: 0px;
    opacity: 1;
    text-transform: uppercase;
    margin-top: 5%;
    margin: 0 auto;
    &:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
`;
const Error = styled.div`
    color: red;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const RegDetails = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');
    const [street, setStreet] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { tempUser } = useSelector((state) => state.subscriber);


    const handleRegister = (e) => {
        console.log("handleRegister");
        console.log(name)
        console.log(email)
        e.preventDefault();
        //VALIDATE

        //PROCESS
        const address = `${street} ${barangay} ${city} ${province} ${region}`;
        console.log(address)
        const consent = {
            tnc: true,
            privacy: true,
            marketing: true,
        }
        const { mobileNumber, password } = tempUser;
        subscriberRegister(dispatch, { mobileNumber, password, name, email, address, consent });
    }

    const resetError = (mobileNumber) => {

    } 

    return (
        <Container>
            <Wrapper>
                <DITOLogo/>
                <Title>Registration</Title>
                <Form>
                    <Input placeholder="Full Name" maxLength="50" type="text" onChange={(e) => setName(e.target.value)} ></Input>
                    <Input placeholder="Email Address" maxLength="50" type="text" onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input placeholder="Region" maxLength="50" type="text" onChange={(e) => setRegion(e.target.value)}></Input>
                    <Input placeholder="Province" maxLength="50" type="text" onChange={(e) => setProvince(e.target.value)}></Input>
                    <Input placeholder="City" maxLength="50" type="text" onChange={(e) => setCity(e.target.value)}></Input>
                    <Input placeholder="Barangay" maxLength="50" type="text" onChange={(e) => setBarangay(e.target.value)}></Input>
                    <Input placeholder="Street" maxLength="50" type="text" onChange={(e) => setStreet(e.target.value)}></Input>
                    <Button onClick={ (e) => handleRegister(e) } >Register</Button>
                </Form>
                <Error hidden={error ? false : true }>{errorMessage}</Error>
            </Wrapper>
        </Container>
    )
}

export default RegDetails
