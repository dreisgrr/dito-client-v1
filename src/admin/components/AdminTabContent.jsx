import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: block;
    height: calc(100vh - 70px);
    position: sticky;
    top: 70px;
    padding-left: 30px;
    padding-right: 30px;
`;
const Title = styled.h3`
    line-height: 70px;
`;
const Content = styled.div`
    width: 100%;
    background-color: white;    
    min-height: 300px;
    display: flex;
    flex-direction: column;
    aligh-items: center;
    justify-content: center;
    
`;
const DrawButton = styled.button`
    width: 200px;
    margin: 0 auto;
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
const DrawText = styled.p`
    margin-top: 10px;
    text-align: center;
`;
const DrawDate = styled.p`
    text-align: center;
`;

const handleDrawWeekly = (e) => {
    e.preventDefault();
    alert('Drawing Daily Winners');
} 

const AdminTabContent = () => {
    return (
        <Container>
            <Title>Daily Draw</Title>
            <Content>
                <DrawButton onClick={handleDrawWeekly}>Draw Daily Winners</DrawButton>
                <DrawText>Automatic Draw Winners Today</DrawText>
                <DrawDate>Dec 2, 2021</DrawDate>
            </Content>
        </Container>
    )
}

export default AdminTabContent
