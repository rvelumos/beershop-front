import React, {useState} from 'react';
import IconItem from '../../UI/IconItem/IconItem';
import './UserMenu.css';
import ProfileMenu from "../../../../Modal/ProfileMenu/ProfileMenu";

const UserMenu = () => {

    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const [mode, setMode] = useState('init');
    const [amountItems, setAmountItems] = useState("");

    let items = "";

    if(mode==='init') {
        const storedItems = localStorage.getItem("shopping_carts");
        if(storedItems !== null) {
            items = Object.keys(JSON.parse(storedItems)).length;
            if (items !== undefined) {
                setAmountItems(items);
                setMode('updateShoppingCart');
                setShoppingCartActive(true);
            }
        }
    }

    return (
        <>
            <div className="UserMenuContainer">
                <div className="userAccount">
                    <IconItem url="/mijn_account/"  icon_class="iconUser" />
                </div>
                <ProfileMenu />
                <div className="userCart">
                    <IconItem url="/winkelwagen/" icon_class="iconCart" />
                    {shoppingCartActive &&
                    <div className="amountCircle"><span>{amountItems}</span></div>
                    }
                </div>
            </div>
        </>
    )
}

export default UserMenu;