import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadUserPoints, loadUserPointsHistory } from "../../redux/apiCalls";
import 'bootstrap/dist/js/bootstrap.js'

import '../../css/main.css';
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
import titlePointsHistory from "../../assets/title-pointhistory.png";

const RafflePageReskin = () => {
    const dispatch = useDispatch();

    const { mobileNumber } = useSelector((state) => state.subscriber?.currentUser?.user);
    let raffleEntry  = useSelector((state) => state.subscriber.raffleEntry.count);
    let points = useSelector((state) => state.subscriber.pointsHistory)
    let isEmpty = (points == null);
    

    const transactionsMap = new Map();
    transactionsMap.set("activation", "DITO SIM Activation");
    transactionsMap.set("DITO39", "DITO 39");
    transactionsMap.set("DITO99", "DITO 99");
    transactionsMap.set("DITO199", "DITO 199");
    transactionsMap.set("firstLogin", "DITO APP");
    transactionsMap.set("FirstLogin", "DITO APP");
    transactionsMap.set("firstlogin", "DITO APP");
    transactionsMap.set("VIVA1", "VIVAMAX Subscription");
    transactionsMap.set("WeTV1", "WeTV");
    transactionsMap.set("HBO1", "HBO 1 month Subscription");
    transactionsMap.set("HBO3", "HBO 3 month Subscription");
    
    if (!raffleEntry) raffleEntry = 0;

    const date = new Date();
    const today = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()} `;
    const hrs = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const loadCountdown = () => {
        let convertToEST = (date) => {
            var estOffset = -4.0; // -5 + 1 daylight savings
            var utc = date.getTime() + date.getTimezoneOffset() * 60000;
            return new Date(utc + 3600000 * estOffset);
          }
          let  getTimeRemaining = (endtime) => {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hour = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
              total: t,
          
              hour: hour,
              minutes: minutes,
              seconds: seconds,
            };
          }
          
          let initializeClock = (id, endtime) => {
            var clock = document.getElementById(id);
          
            var hoursSpan = clock.querySelector(".hour");
            var minutesSpan = clock.querySelector(".minutes");
            var secondsSpan = clock.querySelector(".seconds");
          
            let updateClock = () => {
              var t = getTimeRemaining(endtime);
          
              hoursSpan.innerHTML = ("0" + t.hour).slice(-2);
              minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
              secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
          
              if (t.total <= 0) {
                clearInterval(timeinterval);
              }
            }
          
            updateClock();
            let timeinterval = setInterval(updateClock, 1000);
          }
          
          let getTimeRaffle = () => {
            var now = new Date();
            var nextDraw = new Date();
            nextDraw.setDate(now.getDate() + 1);
            nextDraw.setHours(11, 0, 0, 0);
            return nextDraw;
          }
          
        convertToEST = (date) => {
            var estOffset = +8;
            var utc = date.getTime() + date.getTimezoneOffset() * 60000;
            return new Date(utc + 3600000 * estOffset);
          }
          
          var deadline = getTimeRaffle();
          initializeClock("clockdiv", convertToEST(deadline));
          
    }

    useEffect(() => {
        loadCountdown();
        loadUserPoints(dispatch, { mobileNumber });
        loadUserPointsHistory(dispatch, { mobileNumber });
    }, [])

    return (
        <div className="raffle">
            <div className="container">
                <div className="col-md-12 raffle-entries">
                    <h3>RAFFLE ENTRIES</h3>
                    <h2>{ raffleEntry } <img src={ assetsTicket } /></h2>
                    <p className="raffle-label">Your raffle entries</p>
                    <p className="raffle-date">As of { hrs } { today }</p>
                    <p className="raffle-points"><a className="modal-link" type="button"data-bs-toggle="modal" data-bs-target="#pointshistory">See Points History</a></p>
                </div>
            </div>
            <div id="clockdiv">
                <div className="col-md-12 raffle-countdown">
                    <h3>NEXT LOADED DAILY DRAW</h3>
			        <div className="draw-countdown">
                        <div className ="hours" >
                            <h2 className="hour" >00</h2>
                            <p>HOURS</p>
                        </div>
                        
                        <h2 className="space">:</h2>
                        <div className = "hours" >
                            <h2 className="minutes">00</h2>
                            <p>MINUTES</p>
                        </div>
                        <h2 className="space">:</h2>
                        <div className = "hours" >
                            <h2 className="seconds">00</h2>
                            <p>SECONDS</p>
                        </div>
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
                                    <li>Activate your DITO SIM</li>
                                    <li>Log-in to the DITO APP for the first time</li>
                                    <li>Purchase DITO Promos</li>
                                    <li>Purchase content subscriptions</li>
                                </ul>
                                <img  style={{marginRight: 20 + 'px'}} src={ rafflePrizeWETV } />
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

                            <p><span>500MB valid for 3 days:</span> <br/> 1,000 Daily Winners</p>
                            <p><span>1GB valid for 7 days:</span> <br/> 500 Daily Winners</p>
                            <p><span>2GB valid for 15 days:</span> <br/> 300 Daily Winners</p>
                            <p><span>3GB valid for 15 days:</span> <br/> 100 Daily Winners</p>
                            <p><span>DITO 99 valid for 30 days:</span> <br/> 50 Daily Winners</p>
                            <p><span>DITO 199 valid for 30 days:</span> <br/> 25 Daily Winners</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="prizes prize-voucher">
                            <h4>DIGITAL VOUCHERS</h4>

                            <p className="data-vouchers"><span>PHP 300 <img src={ rafflePrizeLAZ }  style={{ marginBottom: 0 + 'px', width: 10 + 'vh'}}/></span> <br/> 1 Daily Winner</p>
                            <p className="data-vouchers"><span>PHP 500 <img src={ rafflePrizeLAZ }  style={{ marginBottom: 0 + 'px', width: 10 + 'vh'}}/></span> <br/> 20 Daily Winners</p>
                            <p className="data-vouchers"  ><span >PHP 500 <img src={ rafflePrizeSPP }  style={{ marginTop: -1.5 + 'vh', width: 10 + 'vh'}} /></span> <br/> 20 Daily Winners</p>
                            <p className="data-vouchers"><span>1-MONTH <img src={ rafflePrizeWETV } style={{ marginTop: -0.5 + 'vh', width: 10 + 'vh'}} /></span> <br/> 10 Daily Winners</p>
                            <p className="data-vouchers"><span>1-MONTH <img src={ rafflePrizeVIVA } style={{ marginTop:-1 + 'vh', width: 10 + 'vh'}} /></span> <br/> 10 Daily Winners</p>
                            <p className="data-vouchers"><span>3-MONTH <img src={ rafflePrizeVIVA } style={{ marginTop:-1 + 'vh', width: 10 + 'vh'}} /></span> <br/> 6 Weekly Winners</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="prizes prize-phone">
                            <h4>SMARTPHONES</h4>

                            <p><img src={ rafflePrizeS02 } /><br/><span>SAMSUNG A02: </span> <br/> 10 Daily Winners</p>
                            <p><img src={ rafflePrizeS21 } /><br/><span>SAMSUNG S21 5G (256GB): </span> <br/> 1 Weekly Winner</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="pointshistory" tabindex="-1" aria-labelledby="pointshistoryLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-body" >
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <img className="title-pointhistory" src={ titlePointsHistory } />
                        <div className="pointsTableContainer" style={{overflow: 'auto', maxHeight: 400 + 'px'}}>
                        <table className="table table-pointshistory" >
                            <thead>
                                <tr>
                                    <th>Transaction</th>
                                    <th>Points</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                { 
                                    ( !isEmpty )? points.map((item) => 
                        
                                    (
                                            <tr key={item._id} style={{textAlign: 'center'}}>
                                                <td style={{textAlign: 'center'}}>
                                                    {transactionsMap.get(item.transaction)}
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    {item.points}
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    {(item.date).substring(0, 10)}
                                                </td>
                                            </tr>
                                    )) : ""
                                }
                                
                            </tbody>
                        </table>
                        </div>
                        {/* <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                            <a className="page-link" href="#"><span aria-hidden="true">&laquo;</span></a>
                            </li>
                            <li className="page-item"><a class="page-link" href="#">1</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                            </li>
                        </ul>
                        </nav> */}
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RafflePageReskin
