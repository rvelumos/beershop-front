import React from 'react';
import './OfferBanner.css';
import Button from "../../Website/UI/Button/Button";
const OfferBanner = ({image, text}) => {

    return (
        <div className="OfferBannerContainer" style={{backgroundImage: `url('/banners/banner${image}.jpg')`}}>
            <span>{text}</span>
            <Button usage="button" value="Meer informatie" />
        </div>
    )
}

export default OfferBanner;