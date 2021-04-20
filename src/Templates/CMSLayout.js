import React from "react";

import '../Admin.css';
import DetailsProduct from "../Components/Products/Product/DetailsProduct/DetailsProduct";
import { Route} from "react-router-dom";
import StatisticsPage from "../Pages/Statistics/StatisticsPage";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import LeftMenu from "../Components/Cms/Navigation/LeftMenu/LeftMenu";
import Orders from "../Components/Orders/Orders";
import Products from "../Components/Products/Products";
import GiftCards from "../Components/GiftCards/GiftCards";
import UserManagement from "../Components/Cms/UserManagement/UserManagement";
import OrderAddEdit from "../Components/Orders/Order/OrderAddEdit";
import {AddEditForm as GiftCardForm} from "../Components/GiftCards/GiftCard/AddEditForm";

const CMSLayout = (props) => {
    const { authorityAdmin, authorityManufacturer, username, token } = props;

    return(
        <>
            <main className="cms">
                <LeftMenu />
                <Route path="/cms" exact>
                    <AdminHomePage name={username} />
                </Route>

                <Route path="/cms/giftcards" exact>
                    <GiftCards isAdmin={authorityAdmin} token={token} />
                </Route>

                <Route path="/cms/giftcards/edit/:id" exact>
                    <GiftCardForm token={token} />
                </Route>

                <Route path="/cms/giftcards/create" exact>
                    <GiftCardForm token={token} />
                </Route>

                <Route path="/cms/statistics">
                    <StatisticsPage token={token} isManufacturer={authorityManufacturer} isAdmin={authorityAdmin}/>
                </Route>

                <Route path="/cms/products/" exact>
                    <Products layout="table" isAdmin={authorityAdmin} />
                </Route>

                <Route path='/cms/products/create'>
                    {/*<ProductAddEdit mode="add" />*/}
                </Route>

                <Route path='/cms/products/:product_id'>
                   <DetailsProduct token={token} isAdmin={authorityAdmin}/>
                </Route>

                <Route path='/cms/products/edit/:product_id'>
                    <OrderAddEdit token={token} mode="edit" />
                </Route>

                <Route  path='/cms/orders/' exact>
                    <Orders isAdmin={authorityAdmin} token={token}/>
                </Route>

                <Route path='/cms/orders/create'>
                    <OrderAddEdit mode="add" token={token} />
                </Route>

                <Route path='/cms/orders/:order_id'>
                   {/*<DetailsOrder />    */}
                </Route>

                <Route path='/cms/orders/edit/:order_id'>
                    <OrderAddEdit mode="add" />
                </Route>

                <Route path="/cms/users">
                    <UserManagement isAdmin={authorityAdmin} token={token}/>
                </Route>

            </main>
        </>
    )
}

export default CMSLayout;