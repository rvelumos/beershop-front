import React from 'react';
import './OfferBanner.css';
import Button from "../../Website/UI/Button/Button";
const OfferBanner = (props) => {

    return (
        <div className="OfferBannerContainer">
            <span>{props.text}</span>
            <Button usage="button" value="Meer informatie" />
        </div>
    )
}

export default OfferBanner;