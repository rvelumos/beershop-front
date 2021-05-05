import React, {useContext} from 'react';
import './LeftMenu.css';
import {NavLink, Link} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";

const LeftMenu = () => {

    const { logout } = useContext(AuthContext);

    return (
        <>
            <div className="LeftMenuContainer">
                <ul className="LeftMenuItems">
                    <NavLink to="/mijn_account/gegevens" >Mijn gegevens</NavLink>
                    <NavLink to="/mijn_account/orders" >Mijn bestellingen</NavLink>
                    <NavLink to="/mijn_account/cadeaubonnen" >Mijn cadeaubonnen</NavLink>
                    <NavLink to="/mijn_account/bonus" >Bonusproducten</NavLink>
                    <Link to="?logout" onClick={logout}><p>Uitloggen</p></Link>
                </ul>
            </div>
        </>
    )
}

export default LeftMenu;