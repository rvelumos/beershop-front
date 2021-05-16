import React, {useContext} from 'react';
import './LeftMenu.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";
import MenuIcon from "./MenuIcon/MenuIcon";

const LeftMenu = ({isAdmin}) => {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <div className="LeftMenuContainer">
                <ul className="LeftMenuItems">
                    {isAdmin &&
                        <>
                            <div className="menuLink">
                                <NavLink to="/cms/orders"><MenuIcon name="orders" /> Bestellingen</NavLink>
                            </div>
                            <div className="menuLink">
                                <NavLink to="/cms/giftcards" ><MenuIcon name="gifts" /> Cadeaubonnen</NavLink>
                            </div>
                            <div className="menuLink">
                                <NavLink to="/cms/products" ><MenuIcon name="products" /> Producten</NavLink>
                            </div>
                        </>
                    }
                    <div className="menuLink">
                        <NavLink to="/cms/statistics" ><MenuIcon name="stats" /> Statistieken</NavLink>
                    </div>
                    {isAdmin &&
                        <>
                            <div className="menuLink">
                                <NavLink to="/cms/newsletter"><MenuIcon name="email" /> Nieuwsbrief</NavLink>
                            </div>
                            <div className="menuLink">
                                <NavLink to="/cms/users"><MenuIcon name="users" /> Gebruikersbeheer</NavLink>
                            </div>
                        </>
                    }
                    <div className="menuLink">
                        <NavLink to="/cms/uitloggen" onClick={logout}><MenuIcon name="logout" /><p>Uitloggen</p></NavLink>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default LeftMenu;