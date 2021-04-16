import React from 'react';
import './LeftMenu.css';
import {NavLink} from "react-router-dom";

const LeftMenu = () => {

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <>
            <div className="LeftMenuContainer">
                <ul className="LeftMenuItems">
                    <NavLink to="/mijn_account/gegevens" >Mijn gegevens</NavLink>
                    <NavLink to="/mijn_account/orders" >Mijn bestellingen</NavLink>
                    <NavLink to="/mijn_account/cadeaubonnen" >Mijn cadeaubonnen</NavLink>
                    <NavLink to="/mijn_account/bonus" >Bonusproducten</NavLink>
                    <NavLink to="/uitloggen" onClick={handleLogout}><p>Uitloggen</p></NavLink>
                </ul>
            </div>
        </>
    )
}

export default LeftMenu;