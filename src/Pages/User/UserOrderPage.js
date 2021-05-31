import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import Orders from "../../Components/Orders/Orders";
import DetailsOrder from "../../Components/Orders/Order/DetailsOrder/DetailsOrder";

const UserOrderPage = ({token, showDetails}) => {
    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    {showDetails ?
                        <>
                            {<DetailsOrder token={token} />}
                        </>
                        :
                        <>
                            <h1>Orders</h1>
                            <p>Jouw geplaatste orders</p>
                            {<Orders token={token} />}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default UserOrderPage;