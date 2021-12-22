import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import ditoLogo from "../../assets/img/logo.png";
import { sunscriberNotExists, sunscriberOTPVerified, subscriberGenerateOTP, subscriberVerifyOTP } from "../../redux/apiCalls";
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
    min-width: 30%;
    padding: 20px;
`;
const DITOLogo = styled.div`
    min-width: 100%;
    height: 200px;
    background-image: url(${ditoLogo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const Login = styled.button`
    width: 97%;
    border: none;
    padding: 15px 20px;
    background: #052FB0 0% 0% no-repeat padding-box;
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
`;
const Title = styled.h1`
    font-size: 28px;
    font-weight: 400;
    text-align: center;
`;
const Input = styled.input`
    flex: 1;
    min-width: 50%;
    line-height: 30px;
    margin: 20px 10px 0px 0px;
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
const Prefix = styled.input`
    flex: 1;
    max-width: 40px;
    line-height: 30px;
    margin: 20px 10px 0px 0px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 3px #0000001A;
    border-radius: 6px;
    opacity: 1;
    border: none;
    margin-bottom: 7%;
    transition:background-color 0.5s ease;
    font-size: 20px;
    pointer-events:none;
`;
const Button = styled.button`
    width: 97%;
    border: none;
    padding: 15px 20px;
    background: #707070 0% 0% no-repeat padding-box;
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

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated, isNewUser, smsOtp, isFetching, error, errorMessage} = useSelector((state) => state.subscriber);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        if(mobileNumber.length<10) return
        sunscriberNotExists(dispatch, { mobileNumber });
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        subscriberVerifyOTP(dispatch, {mobileNumber, otp});
    }

    const resetError = (mobileNumber) => {
        setMobileNumber(mobileNumber);
    } 

    useEffect(() => {
        subscriberGenerateOTP(dispatch, mobileNumber);
    }, [isNewUser])

    useEffect(() => {
        if(smsOtp){
            sunscriberOTPVerified(dispatch, mobileNumber);
            history.push("/regDetails");
        }
    }, [smsOtp])

    return (
        <Container>
            <Wrapper>
                <DITOLogo/>
                <Title>Registration</Title>
                <Form>
                    <Prefix hidden={isNewUser ? true : false } value="+63"></Prefix>
                    <Input hidden={isNewUser ? true : false } placeholder="Input your mobile number" maxLength="10" type="tel" onChange={(e) => resetError(e.target.value)}></Input>
                    <Button hidden={isNewUser ? true : false } onClick={ handleLogin } >Proceed</Button>
                    <Input hidden={isNewUser ? false : true } maxLength="6" placeholder="Enter your One Time Passcode (OTP)" type="tel" onChange={(e) => setOtp(e.target.value)}></Input>
                    <Button hidden={isNewUser ? false : true } onClick={ verifyOTP } >Verify</Button>
                </Form>
                <Error hidden={error ? false : true }>{errorMessage}</Error>
            </Wrapper>
        </Container>
    )
}

export default Register
