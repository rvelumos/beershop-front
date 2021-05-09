import React, {useContext} from 'react';
import './LeftMenu.css';
import {NavLink, Link} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";

const LeftMenu = () => {

    const { logout } = useContext(AuthContext);

    return (
        <>
            <div className="LeftMenuContainer">
                <div className="LeftMenuItems">
                    <div className="mainItems">
                        <NavLink to="/mijn_account/gegevens" >Mijn gegevens</NavLink>
                        <NavLink to="/mijn_account/orders" >Mijn bestellingen</NavLink>
                        <NavLink to="/mijn_account/cadeaubonnen" >Mijn cadeaubonnen</NavLink>
                        <NavLink to="/mijn_account/bonus" >Bonusproducten</NavLink>
                    </div>
                    <div className="logout">
                        <div className="button">
                            <Link to="?logout" onClick={logout}><p>Uitloggen</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftMenu;