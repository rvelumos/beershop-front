import React from 'react';

function MenuIcon({name}) {
    return(
        <img src={`/icons/cms/icon_${name}.png`} alt="menu item" className="leftMenuIcon" />
    )
}
export default MenuIcon;