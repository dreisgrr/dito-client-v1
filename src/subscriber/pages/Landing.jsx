import React from 'react';
import styled from "styled-components";
import ditoLogo from "../../assets/img/logo.png";

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
const Register = styled.button`
    width: 97%;
    border: none;
    padding: 15px 20px;
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
`;

const Landing = () => {
    return (
        <Container>
            <Wrapper>
                <DITOLogo/>
                <Form>
                    <Register>Register</Register>
                    <Login>Log in</Login>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Landing
