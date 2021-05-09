import React from 'react';
import './TopNavigationMenuItem.css';
import { NavLink } from "react-router-dom";


const TopNavigationMenuItem = ({url, name, handler}) => {

    return (
        <div className="TopNavigationMenuItem">
            <NavLink
                to={url}
                onClick={(e) => handler()}
                activeStyle={{
                    fontWeight: "bold",
                    color: "#FFA303"
                }}
            >{name}
            </NavLink>

        </div>
    )
}

export default TopNavigationMenuItem;