import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";

import '../../css/main.css';
import logoLoadedpasko from "../../assets/logo-loadedpasko.png";
import arrowRed from "../../assets/arrow-red.png";
import assetsTicket from "../../assets/ticket.png";

const TopbarItem = styled.li`
    padding: 15px 0;
    coloer: blue;
    color: ${
        props => props.active ?
        "#ffffff" : "#0038a8"
    };
    background-color: ${
        props => props.active ?
        "#0038a8" : "#ffffff"
    };
    text-decoration: none;
`;


const TopbarReskin = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    //("split"+splitLocation[1].toString().includes("/raffle") || splitLocation[1] === '');
    const { name, mobileNumber } = useSelector((state) => state.subscriber?.currentUser?.user);

    const handleLogout = () => {
        localStorage.removeItem("persist:root");
        window.location = "/";
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" ><img className="logo-loadedpasko" src={ logoLoadedpasko }/></a>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="link-nav-wrap" to={"/raffle"}>
                                <TopbarItem  className="link-item"  active={splitLocation[1].toString().includes("raffle") || splitLocation[1] === '' ? true : false}>RAFFLE</TopbarItem>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link-nav-wrap" to={"/faqs"}>
                            <TopbarItem className="link-item"  active={splitLocation[1].toString().includes("faqs") ? true : false}>FAQS</TopbarItem>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link-nav-wrap" to={"/account"}>
                            <TopbarItem className="link-item"  active={splitLocation[1].toString().includes("account") ? true : false}>Account</TopbarItem>
                            </Link>
                        </li>
                        <li className="nav-item"></li>
                        <li className="nav-item"></li>
                    </ul>

                    <span className="navbar-text account">
                        Welcome, <br/> <b>{name}</b>
                    </span>

                    <span className="navbar-text signout">
                        <a href="/" type="button" onClick={ handleLogout }><img src={ arrowRed }/></a>
                    </span>
                </div>

                <div className="mobile-account">
                    <p>Welcome, <br/> <b>{name}</b></p>
                    <a href="/" type="button" onClick={ handleLogout }><img src={ arrowRed }/></a>
                </div>
            </div>
        </nav>
    )
}

export default TopbarReskin
