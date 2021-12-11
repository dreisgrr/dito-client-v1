import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";

import '../../css/main.css';
import mobilemenuRaffle from "../../assets/mobile-menu-raffle.png";
import mobilemenuWinners from "../../assets/mobile-menu-winners.png";
import mobilemenuFaqs from "../../assets/mobile-menu-faqs.png";
import mobilemenuProfile from "../../assets/mobile-menu-profile.png";

const TopbarItem = styled.li`
    padding: 15px 0;
    coloer: white;
    color: ${
        props => props.active ?
        "white" : "white"
    };
    background-color: ${
        props => props.active ?
        "#0038a8" : "#ffffff"
    };
    text-decoration: none;
`;

const FooterReskin = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    console.log("split"+splitLocation[1].toString().includes("/raffle") || splitLocation[1] === '');
    const { name, mobileNumber } = useSelector((state) => state.subscriber?.currentUser?.user);
    
    return (
        <div>
            <footer className="mobile-footer">
                
                    <div className="nav-menu">
                        <Link to={"/raffle"}><img src={ mobilemenuRaffle } /></Link>
                    </div>
                    <div className="nav-menu">
                        <Link to={"/faqs"}><img src={ mobilemenuFaqs } /></Link>
                    </div>

                {/* <div className="nav-menu">
                    <a ><img src={ mobilemenuWinners } /></a>
                </div> */}

                {/* <div className="nav-menu">
                    <a ><img src={ mobilemenuProfile } /></a>
                </div> */}
            </footer>
        </div>
    )
}

export default FooterReskin
