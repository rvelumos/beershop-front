import React from 'react';
import './LeftMenu.css';
import {NavLink} from "react-router-dom";

const LeftMenu = ({isAdmin}) => {

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <>
            <div className="LeftMenuContainer">
                <ul className="LeftMenuItems">
                    {isAdmin &&
                        <>
                            <NavLink to="/cms/orders">Bestellingen</NavLink>
                            <NavLink to="/cms/giftcards" >Cadeaubonnen</NavLink>
                            <NavLink to="/cms/products" >Producten</NavLink>
                        </>
                    }
                    <NavLink to="/cms/statistics" >Statistieken</NavLink>
                    {isAdmin &&
                        <>
                            <NavLink to="/cms/newsletter">Nieuwsbrief</NavLink>
                            <NavLink to="/cms/users">Gebruikersbeheer</NavLink>
                        </>
                    }
                    <NavLink to="/cms/uitloggen" onClick={handleLogout}><p>Uitloggen</p></NavLink>
                </ul>
            </div>
        </>
    )
}

export default LeftMenu;