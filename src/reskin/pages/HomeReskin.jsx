import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadUserPoints, loadUserPointsHistory } from "../../redux/apiCalls";

import PointsHistory from "../../reskin/components/PointsHistory";

import logoLoadedpasko from "../../assets/logo-loadedpasko.png";
import arrowRed from "../../assets/arrow-red.png";
import assetsTicket from "../../assets/ticket.png";
import rafflePrizeWETV from "../../assets/raffle-prize-wetv.png";
import rafflePrizeVIVA from "../../assets/raffle-prize-vivamax.png";
import rafflePrizeLAZ from "../../assets/raffle-prize-lazada.png";
import rafflePrizeSPP from "../../assets/raffle-prize-shopee.png";
import rafflePrizeS02 from "../../assets/raffle-prize-samsung-a0.png";
import rafflePrizeS21 from "../../assets/raffle-prize-samsung-s21.png";
import mobilemenuRaffle from "../../assets/mobile-menu-raffle.png";
import mobilemenuWinners from "../../assets/mobile-menu-winners.png";
import mobilemenuFaqs from "../../assets/mobile-menu-faqs.png";
import mobilemenuProfile from "../../assets/mobile-menu-profile.png";
import howToJoin1 from "../../assets/how-to-join-1.png";
import howToJoin2 from "../../assets/how-to-join-2.png";
import howToJoin3 from "../../assets/how-to-join-3.png";

const HomeReskin = () => {
    const dispatch = useDispatch();

    const { name, mobileNumber } = useSelector((state) => state.subscriber?.currentUser?.user);
    loadUserPoints(dispatch, { mobileNumber });
    loadUserPointsHistory(dispatch, { mobileNumber });

    let raffleEntry  = useSelector((state) => state.subscriber.raffleEntry.count)
    if (!raffleEntry) raffleEntry = 0;

    const handleLogout = () => {
        localStorage.removeItem("persist:root");
        window.location = "/reskin";
    }

    return (
        <div className="raffle">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" ><img className="logo-loadedpasko" src={ logoLoadedpasko }/></a>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" >RAFFLE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" ></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" ></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" ></a>
                            </li>
                        </ul>

                        <span className="navbar-text account">
                            Welcome, <br/> <b>{name}</b>
                        </span>

                        <span className="navbar-text signout">
                            <a href="/reskin" type="button" onClick={ handleLogout }><img src={ arrowRed }/></a>
                        </span>
                    </div>

                    <div className="mobile-account">
                        <p>Welcome, <br/> <b>{name}</b></p>
                        <a ><img src={ arrowRed }/></a>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="col-md-12 raffle-entries">
                    <h3>RAFFLE ENTRIES</h3>
                    <h2>{ raffleEntry } <img src={ assetsTicket } /></h2>
                    <p className="raffle-label">Your raffle entries</p>
                    <p className="raffle-date">As of 12:00 AM 12-01-21</p>
                    <p className="raffle-refresh">Your raffle entries will be refreshed in the next 00:15 hour(s).</p>
                    <p className="raffle-points"><PointsHistory/></p>
                </div>
            </div>
            <div className="col-md-12 raffle-countdown">
                <h3>NEXT LOADED DAILY DRAW</h3>
                <div className="draw-countdown">
                    <div className="hours">
                        <h2>11</h2>
                        <p></p>
                    </div>
                    <h2 className="space">:</h2>
                    <div class="hours">
                        <h2>00</h2>
                        <p></p>
                    </div>
                    <h2 className="space">:</h2>
                    <div className="hours">
                        <h2>AM</h2>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="col-md-12 raffle-join">
                <h3>HOW TO JOIN</h3>
                <div className="raffle-steps">
                    <img className="steps-img"src={ howToJoin1 }/>
                        <div className="steps-details">
                            <h5>Earn points with any DITO transaction:</h5>
                            <ul>
                                <li>Active your DITO SIM</li>
                                <li>Log-in to the DITO APP for the fist time</li>
                                <li>Purchase DITO Promos</li>
                                <li>Purchase content subscriptions</li>
                            </ul>
                            <img src={ rafflePrizeWETV } />
                            <img src={ rafflePrizeVIVA } />
                        </div>
                </div>

                <div className="raffle-steps">
                    <img className="steps-img"src={ howToJoin2 } />
                        <div className="steps-details">
                            <h5>Convert your DITO Raffle Points to Raffle Entries by registering at LoadedKaDITO.ph</h5>
                        </div>
                </div>

                <div className="raffle-steps">
                    <img className="steps-img"src={ howToJoin3 } />
                        <div className="steps-details">
                            <h5>Get a chance to be part of thousands of winners everyday</h5>
                        </div>
                </div>
            </div>
            <div className="col-md-12 raffle-prizes">
                <h3>DITO RAFFLE PRIZES</h3>

                <div className="row">
                    <div className="col-md-4">
                        <div className="prizes">
                            <h4>DATA PRIZES</h4>

                            <p><span>500 MB valid for 3 days:</span> <br/> 1,000 Daily Winners</p>
                            <p><span>1 GB valid for 7 days:</span> <br/> 500 Daily Winners</p>
                            <p><span>2 GB valid for 15 days:</span> <br/> 300 Daily Winners</p>
                            <p><span>3 GB valid for 15 days:</span> <br/> 100 Daily Winners</p>
                            <p><span>DITO 99 valid for 30 days:</span> <br/> 50 Daily Winners</p>
                            <p><span>DITO 199 valid for 30 days:</span> <br/> 25 Daily Winners</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="prizes prize-voucher">
                            <h4>DATA VOUCHERS</h4>

                            <p><span>PHP 500 <img src={ rafflePrizeLAZ } /></span> <br/> 20 Daily Winners</p>
                            <p><span>PHP 500 <img src={ rafflePrizeSPP } /></span> <br/> 20 Daily Winners</p>
                            <p><span>1-MONTH <img src={ rafflePrizeWETV } /></span> <br/> 10 Daily Winners</p>
                            <p><span>1-MONTH <img src={ rafflePrizeVIVA }/></span> <br/> 10 Daily Winners</p>
                            <p><span>3-MONTH <img src={ rafflePrizeVIVA } /></span> <br/> 6 Weekly Winners</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="prizes prize-phone">
                            <h4>SMART PHONES</h4>

                            <p><img src={ rafflePrizeS02 } /><br/><span>SAMSUNG A02: </span> <br/> 10 Daily Winners</p>
                            <p><img src={ rafflePrizeS21 } /><br/><span>SAMSUNG S21 5G (256GB): </span> <br/> 1 Weekly Winner</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mobile-footer">
                <div className="nav-menu">
                    <a ><img src={ mobilemenuRaffle } /></a>
                </div>

                <div className="nav-menu">
                    <a ><img src={ mobilemenuWinners } /></a>
                </div>

                <div className="nav-menu">
                    <a ><img src={ mobilemenuFaqs } /></a>
                </div>

                <div className="nav-menu">
                    <a ><img src={ mobilemenuProfile } /></a>
                </div>
            </footer>
        </div>
    )
}

export default HomeReskin
