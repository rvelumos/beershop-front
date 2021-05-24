import React from 'react';
import './Footer.css';
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
                        <li className="email"><img src="/icons/icon_mail.png" alt='Mail' /> info@beershop.nl</li>
                        <li className="phone"><img src="/icons/icon_phone.png" alt='Telefoon' />0612345678</li>
                        <li className="whatsapp"><img src="/icons/icon_wa.png" alt='Whatsapp' />0612345678</li>
                    </ul>
                    <ul>
                        <li><Link to="/contact">Contactformulier</Link></li>
                    </ul>

                </div>
                <div className="FooterColumn social" >
                    <h4>Volg ons op:</h4>
                    <a href="https://www.facebook.com/"><img src="/icons/social_icon_fb.png" alt='Facebook' /></a>
                    <a href="https://www.instagram.com/"><img src="/icons/social_icon_ig.png" alt='Instagram' /></a>
                    <a href="https://www.twitter.com/"><img src="/icons/social_icon_tw.png" alt='Twitter' /></a>
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