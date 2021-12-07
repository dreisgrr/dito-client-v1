import React from 'react'
import styled from "styled-components";
import ticket from "../../assets/img/icon-ticket@2x.png";
import {useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f8f8f8 0% 0% no-repeat padding-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 60%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;
const Card = styled.div`
    width: 70vw;
    height: 70vh;
    border: 2px solid #052FB0;
    font-size: 35px;
    font-weight: 400;
    text-align: center;
    color: #052FB0;
    line-height: 40px;
    font-weight: 700;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    display: inline-block;
    vertical-align: top;
`;
const CardTitle = styled.h1`
    width: 100%;
    min-height: 50px;
    border: 2px solid blue;
    font-size: 16px;
    text-align: center;
    color: #052FB0;
    line-height: 40px;
    margin: 0 auto;
    color: white;
    background-color: #052FB0;
`;
const RaffleWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;
    
`;
const RaffleNumber = styled.h1`
    padding-top: 70px;
    font-size: 66px;
    text-align: center;
    color: #151515;
    line-height: 60px;
    margin: 0 auto;
    background-color: #00000000;
    align-items: center;
    float: left;
    display: block;
    position: relative;
    padding-bottom: 10px;
`;
const RaffleImage = styled.div`
    min-width: 70%;
    height:50px;
    background-image: url(${ticket});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
    margin: 0 auto;
`;
const RaffleHeader = styled.div`
    text-align: center;
    color: #151515;
    margin-top: 15px;
`;

const RafflePage = () => {
    let raffleEntry  = useSelector((state) => state.subscriber.raffleEntry.count)
    if (!raffleEntry) raffleEntry = 0;
    return (
        <Container>
            <Wrapper>
                <Card>
                    <CardTitle>
                        Raffle Entries
                    </CardTitle>
                    
                    <RaffleWrapper>
                            <RaffleNumber>{raffleEntry}</RaffleNumber>
                            <RaffleImage/>
                        </RaffleWrapper>
                            <RaffleHeader>Your Raffle Entries</RaffleHeader>
                </Card>
            </Wrapper>
        </Container>
    )
}

export default RafflePage
