import React from 'react'

import '../../css/main.css';

const TopbarReskin = () => {

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
                                <a className="nav-link active" aria-current="page" >RAFFLE</a>
                            </li>
                            <li className="nav-item">
                                
                            </li>
                            <li className="nav-item">
                            </li>
                            <li className="nav-item">
                            </li>
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
