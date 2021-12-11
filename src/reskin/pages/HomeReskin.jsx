import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadUserPoints, loadUserPointsHistory } from "../../redux/apiCalls";

import PointsHistory from "../components/PointsHistory";

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

    const date = new Date();
    const today = `${date.getMonth()+1}-${date.getDate()},-${date.getFullYear()} `;
    const hrs = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    const handleLogout = () => {
        localStorage.removeItem("persist:root");
        window.location = "/";
    }
    

    return (
        <div className="raffle">
            
            
            
            
            
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
