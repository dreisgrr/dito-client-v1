import React from 'react'
import { afterSplashScreen } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

import '../../css/main.css';
import closeButton from "../../assets/close-button.png";

const SplashReskin = () => {
    const dispatch = useDispatch();

    const handleClearWelcomeState = () => {
        afterSplashScreen(dispatch);
    }

    return (
        <div className="raffle">
            <div className="popup-firstlogin">
                <div className="popup">
                    <a href="/reskin" onClick={ handleClearWelcomeState } ><img className="popup-close" src={ closeButton } /></a>
                    <h2>Congrats!</h2>  
                    <h5>You've successfully registered to the DITO Loaded ang Pasko Raffle Promo!
                    Ready ka na ba to win?</h5>
                    <p>Keep subscribing to DITO's promos and offerings to load up on more entries!</p>
                </div>
            </div>
        </div>
    )
}

export default SplashReskin
