import React from 'react'
import styled from "styled-components";
import ditoLogo from "../../assets/img/logo.png";
import { ExitToAppSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

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
    line-height: 17px;
    font-size: 13x;
    aligh-items: center;    
    justify-content: center;
    color: #052FB0;
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

const Topbar = () => {

    const { accessToken, mobileNumber, name, email, address, activity} = useSelector((state) => state.subscriber?.currentUser?.user);
    
    const handleLogout = () => {
        console.log("Logout");
        localStorage.removeItem("persist:root");
        window.location = "/";
    }

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
                                    <p>Welcome,<br/><strong>{name}</strong>!</p>
                                </TopbarSessionText>
                                <Logout>
                                    <Link onClick={handleLogout} to={"/login"}><ExitToAppSharp style={{fontSize: 40 + 'px', paddingTop: 7 + 'px', paddingBottom: 7 + 'px', paddingLeft: 10 + 'px', borderLeft: 1 + 'px solid grey'}}/></Link>
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
