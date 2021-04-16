import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import Orders from "../../Components/Orders/Orders";

const UserOrderPage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Orders</h1>
                    <p>Jouw geplaatste orders</p>

                    <Orders />
                </div>
            </div>
        </>
    )
}

export default UserOrderPage;