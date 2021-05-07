import React from 'react';
import './Footer.css';
import  '../../../../Assets/icons/icon_mail.png';
import {Link} from "react-router-dom";

const Footer = () => {

    return (
        <>
        <div className="Footer">
            <div className="FooterContainer" >
                <div className="FooterColumn contactInfo" >
                    <h4>Contactgegevens</h4>
                    <ul>
                        <li>BeerShop BV</li>
                        <li>Straat 123</li>
                        <li>0000 AA Stad</li>
                    </ul>
                    <ul className="icons">
                        <li className="email">info@beershop.nl</li>
                        <li className="phone">0612345678</li>
                        <li className="whatsapp">0612345678</li>
                    </ul>
                    <ul>
                        <li><Link to="/contact">Contactformulier</Link></li>
                    </ul>

                </div>
                <div className="FooterColumn social" >
                    <h4>Volg ons op:</h4>
                </div>
                <div className="FooterColumn info" >
                    <h4>Informatie:</h4>
                    <Link to="/info/voorwaarden">Algemene voorwaarden</Link><br/>
                    <Link to="/info/privacy">Privacy</Link><br />
                    <Link to="/info/bezorging">Bezorging</Link><br />
                    <Link to="/info/faq">FAQ</Link>
                </div>
            </div>
            <span>
                 <ul className="BottomInfo">
                    <li>Voor 17:00 besteld, morgen in huis!</li>
                    <li>Vanaf €24.95 gratis verzending!</li>
                    <li>Veilig verpakt</li>
                 </ul>
             </span>
        </div>
        </>
    )
}

export default Footer;