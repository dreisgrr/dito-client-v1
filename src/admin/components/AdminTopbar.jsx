import React from 'react';
import styled from "styled-components";
import ditoLogo from "../../assets/img/logo.png";
import { ExitToAppSharp } from '@mui/icons-material';

const Container = styled.div`
    width: 100%;
    height: 70px;
    position: sticky;
    top: 0;
    background-color: white;
`;
const TopbarWrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    aligh-items: center;
    justify-content: space-between;
`;
const TopbarLeft = styled.div`

`;
const TopbarRight = styled.div`
    display: flex;
    aligh-items: center;    
`;
const TopbarIcons = styled.div`
    height: 54px;
    display: flex;
    aligh-items: center;    
    justify-content: center;
    line-height: 54px;
    margin-top: 8px;
    margin-bottom: 8px;
`;
const TopbarSessionText = styled.div`
    line-height: 16px;
    font-size: 16px;
    padding: 10px;
`;
const DITOLogo = styled.div`
    height: 50px;
    width: 120px;
    background-image: url(${ditoLogo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-top: 10px;
`;
const Logout = styled.button`
    border: none;
    background-color: white;
`;

const handleExit = (e) => {
    e.preventDefault();
    alert("Signing out");
};

const Topbar = () => {
    return (
        <div>
            <Container>
                <TopbarWrapper>
                    <TopbarLeft>
                        <DITOLogo/>
                    </TopbarLeft>
                    <TopbarRight>
                        <TopbarIcons>
                                <TopbarSessionText>
                                    <p>Welcome,</p>
                                    <p><strong>(Admin)</strong> Amplab!</p>
                                </TopbarSessionText>
                                <Logout>
                                    <ExitToAppSharp onClick={handleExit} style={{fontSize: 40 + 'px', paddingTop: 7 + 'px', paddingBottom: 7 + 'px', paddingLeft: 10 + 'px', borderLeft: 1 + 'px solid grey'}}/>
                                </Logout>
                                {/* <ExitToAppSharp onClick={handleExit} style={{fontSize: 40 + 'px', paddingTop: 7 + 'px', paddingBottom: 7 + 'px', paddingLeft: 10 + 'px', borderLeft: 1 + 'px solid grey'}}/>
                                */}
                        </TopbarIcons>
                    </TopbarRight>
                </TopbarWrapper>
            </Container>
        </div>
    )
}

export default Topbar
