import React from 'react'
import { Link } from 'react-router-dom';

import '../../css/main.css';

import logoLoadedkadito from "../../assets/NEW-DITO-LOGO.png";
import logoDito from "../../assets/logo-dito.png";
import howToJoin1White from "../../assets/how-to-join-1_white.png";
import howToJoin2White from "../../assets/how-to-join-2_white.png";
import howToJoin3White from "../../assets/how-to-join-3_white.png";
import howToJoinSocmed from "../../assets/how-to-join-socmed.png";
import rafflePrizeWeTV from "../../assets/raffle-prize-wetv.png";
import rafflePrizeViva from "../../assets/raffle-prize-vivamax.png";
import homeFooter from "../../assets/bg-home_footer.png";

const LandingReskin = () => {
    return (
        <div className="home">
            <div className="container home-content">
                <img className="logo-loadeddito" src={ logoLoadedkadito }/>
                <h4>DAHIL MAHAL KA NAMIN DITO, <brr/>WE ARE GIVING AWAY</h4>
                <h2>THOUSANDS OF PRIZES DAILY!</h2>

                <div className="row btn-mobile">
                    <Link className={"btn btn-red "}  to={"/register"} >REGISTER NOW</Link>
                    <Link className={"btn btn-blue "}  to={"/login"} >LOGIN</Link>
                </div>

                <h6 style={{fontSize: 28 + 'px', marginBottom: -10 + 'px', marginTop: 60 + 'px', paddingLeft: 20 + 'px',  paddingRight: 20 + 'px'}}>HOW TO JOIN!</h6>

                <div className="row div-howtojoin">
                    <div className="col-md-4">
                        <div className="box-howtojoin-1" >
                            <img className="img-howtojoin"src={ howToJoin1White } />
                            <div className="howtojoin-details">
                                <p >Earn points with any DITO transaction:</p>
                                <ul>
                                    <li>Activate your DITO SIM</li>
                                    <li>Log-in to the DITO APP for the first time</li>
                                    <li>Purchase DITO Promos</li>
                                    <li>Purchase content subscriptions</li>
                                </ul>
                                <div className="box-subscriptions">
                                    <img src={ rafflePrizeWeTV } />
                                    <img src={ rafflePrizeViva } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box-howtojoin-2" > 
                            <img className="img-howtojoin" src={ howToJoin2White } />
                            <div className="howtojoin-details">
                                <p >Convert your DITO Raffle Points to Raffle Entries by registering at LoadedKaDITO.ph</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box-howtojoin-3" >
                        <img className="img-howtojoin"src={ howToJoin3White }  />
                            <div className="howtojoin-details">
                                <p>Get a chance to be part of thousands of winners everyday</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <a href="https://dito.ph/loaded-ka-dito-mechanics?hsLang=en" target="_blank" className="link-seemachanics">See Full Mechanics</a>
                    </div>
                </div>
                <div className="row btn-desktop justify-content-center">
                    <div className="col-md-3">
                        <Link className={"btn btn-red "}  to={"/register"} >REGISTER NOW</Link>
                    </div>

                    <div className="col-md-3">
                        <Link className={"btn btn-blue "}  to={"/login"} >LOGIN</Link>
                    </div>
                </div>
                <div className="col-md-12">
                    <img className="img-homefooter-1" src={ logoDito } />
                    <img className="img-homefooter-2" src={ howToJoinSocmed } />
                    <p className="footer-dit">Promo runs from December 6, 2021 to January 15, 2022. Per DTI Fair Trade Permit No. FTEB-133067 Series of 2021.<br/>
                    Additional 6 weekly winners of Vivamax 3-month subscription as APPROVED BY DTI-FTEB</p>
                </div>
            </div>      
            <footer>
                <img class="home-footer" src={ homeFooter }/>
            </footer>      
        </div>
    )
}

export default LandingReskin
