import React from 'react';
import './TopNavigationMenuItem.css';
import { NavLink } from "react-router-dom";


const TopNavigationMenuItem = (props) => {

    return (
        <div className="TopNavigationMenuItem">
            <NavLink
                to={props.url}
                activeStyle={{
                    fontWeight: "bold",
                    color: "#FFA303"
                }}
            >{props.name}
            </NavLink>

        </div>
    )
}

export default TopNavigationMenuItem;