import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f8f8f8 0% 0% no-repeat padding-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div``;
const Title = styled.h1``;
const Form = styled.form``;
const Input = styled.div``;
const Button = styled.button``;

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <Form>
                    <Input placeholder="email"/>
                    <Input placeholder="password"/>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
