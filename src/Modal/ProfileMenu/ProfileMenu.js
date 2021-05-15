import React, {useContext, useState} from 'react';
import './ProfileMenu.css';
import TopNavigationMenuItem
    from "../../Components/Website/Navigation/TopNavigation/TopNavigationItems/TopNavigationMenuItem/TopNavigationMenuItem";
import {AuthContext} from "../../context/AuthContext";
import IconItem from "../../Components/Website/UI/IconItem/IconItem";

function ProfileMenu() {
    const [openProfileModal, setOpenProfileModal] = useState(false);

    const { username } = useContext(AuthContext);

    const toggleProfileModal = () => {
        setOpenProfileModal(!openProfileModal);
    }

    let className;
    if(openProfileModal)
        className = "open";
    else
        className = "closed";

    return (
        <>
            {username ?
                <div className="profileMenuContainer" onClick={(e) => toggleProfileModal()}>
                    <div id="profileMenu" className={className}>
                        <div className="iconUser"></div>
                    </div>
                </div>
            :
                <div className="userAccountMobile">
                    <IconItem url="/mijn_account/"  icon_class="iconUser" />
                </div>
            }

            {openProfileModal &&
            <div className="profileModal">
                <div className="profileContainer">
                    <div className="profileMenuItems">
                        <h1>Gebruikersmenu</h1>
                        <TopNavigationMenuItem url="/mijn_account" name="hoofdpagina" handler={toggleProfileModal} />
                        <TopNavigationMenuItem url="/mijn_account/gegevens" name="mijn gegevens" handler={toggleProfileModal} />
                        <TopNavigationMenuItem url="/mijn_account/orders" name="mijn orders" handler={toggleProfileModal} />
                        <TopNavigationMenuItem url="/mijn_account/cadeaubonnen" name="mijn cadeaubonnen" handler={toggleProfileModal} />
                        <TopNavigationMenuItem url="/mijn_account/bonus" name="bonusproducten" handler={toggleProfileModal} />
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ProfileMenu;