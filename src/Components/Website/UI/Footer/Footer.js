import React from 'react';
import './Footer.css';
import  '../../../../Assets/icons/icon_mail.png';

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

                </div>
                <div className="FooterColumn social" >
                    <h4>Volg ons op:</h4>
                </div>
                <div className="FooterColumn conditions" >
                    <h4>Informatie:</h4>
                    <a href="/info/voorwaarden">Algemene voorwaarden</a><br/>
                    <a href="/info/privacy">Privacy</a><br />
                    <a href="/info/bezorging">Bezorging</a><br />
                    <a href="/info/faq">FAQ</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;