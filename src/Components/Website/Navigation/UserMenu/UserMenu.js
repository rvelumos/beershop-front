import React from 'react';
import IconItem from '../../UI/IconItem/IconItem';
import './UserMenu.css';

const UserMenu = () => {

    return (
        <>
            <div className="UserMenuContainer">
                <IconItem url="/mijn_account/"  icon_class="iconUser" />
                <IconItem url="/winkelwagen/" icon_class="iconCart" />
            </div>
        </>
    )
}

export default UserMenu;