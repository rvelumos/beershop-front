import React from 'react';
import './OfferBanner.css';
import {Link} from "react-router-dom";

const OfferBanner = ({image, text}) => {

    return (
        <div className="OfferBannerContainer" style={{backgroundImage: `url('/banners/banner${image}.jpg')`}}>
            <span>{text}</span>
            <Link to="/aanbiedingen/" className="button" >Meer informatie</Link>
        </div>
    )
}

export default OfferBanner;