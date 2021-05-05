import React, {useContext} from 'react';
import './LeftMenu.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";

const LeftMenu = ({isAdmin}) => {
    const { logout } = useContext(AuthContext);

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
                    <NavLink to="/cms/uitloggen" onClick={logout}><p>Uitloggen</p></NavLink>
                </ul>
            </div>
        </>
    )
}

export default LeftMenu;