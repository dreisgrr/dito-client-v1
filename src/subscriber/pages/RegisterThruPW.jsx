import React from 'react';
import styled from "styled-components";
import axios from "axios";
import dotenv from "dotenv"
import ditoLogo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import { sunscriberNotExistsPW, sunscriberNotExists, resetLoginError } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

dotenv.config();


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
    max-width: 400px;
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
const Title = styled.h1`
    font-size: 28px;
    font-weight: 300;
    text-align: center;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
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
const Button = styled.button`
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


const RegisterThruPW = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { error, errorMessage} = useSelector((state) =>  state.subscriber);


    const handleRegister = (e) => {
        e.preventDefault();
        sunscriberNotExists(dispatch, { mobileNumber });
    }

    const resetError = (formMobileNumber) => {
        setMobileNumber(formMobileNumber);
    } 

    return (
        <Container>
            <Wrapper>
                <DITOLogo/>
                <Title>Registration</Title>
                <Form>
                    <Prefix value="+63"></Prefix>
                    <Input placeholder="Input your mobile number" type="tel" onChange={(e) => resetError(e.target.value)}></Input>
                    <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Button onClick={ handleRegister } >Proceed</Button>
                    
                </Form>
                <Error hidden={error ? false : true }>{errorMessage}</Error>
            </Wrapper>
        </Container>
    )
}

export default RegisterThruPW
