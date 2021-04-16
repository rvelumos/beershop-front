import React from 'react';
import { NavLink } from "react-router-dom";
import './IconItem.css';

const IconItem = (props) => {

    return (
        <>
            <div className="IconContainer">
                <NavLink
                    to={props.url}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "FFA303"
                    }}
                ><div className={props.icon_class}></div>
                </NavLink>
            </div>
        </>
    )
}

export default IconItem;