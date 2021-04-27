import React from "react";

import '../Admin.css';
import { Route} from "react-router-dom";

import LeftMenu from "../Components/Cms/Navigation/LeftMenu/LeftMenu";

import StatisticsPage from "../Pages/Statistics/StatisticsPage";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import Orders from "../Components/Orders/Orders";
import Products from "../Components/Products/Products";
import GiftCards from "../Components/GiftCards/GiftCards";
import UserManagement from "../Components/Cms/UserManagement/UserManagement";
import GiftCardUsageOverview from "../Components/GiftCards/GiftCard/GiftCardUsageOverview/GiftCardUsageOverview";
import NewsletterOverview from "../Components/Cms/NewsletterOverview/NewsletterOverview";

import {AddEditForm as ProductForm} from "../Components/Products/Product/AddEditForm/AddEditForm";
import {AddEditForm as OrderForm} from "../Components/Orders/Order/AddEditForm/AddEditForm";
import {AddEditForm as UserForm} from "../Components/Cms/UserManagement/AddEditForm/AddEditForm";
import {AddEditForm as GiftCardForm} from "../Components/GiftCards/GiftCard/AddEditForm/AddEditForm";

const CMSLayout = (props) => {
    const { authorityAdmin, authorityManufacturer, username, token } = props;

    return(
        <>
            <main className="cms">
                <LeftMenu isAdmin={authorityAdmin} />
                <Route path="/cms" exact>
                    <AdminHomePage name={username} />
                </Route>

                <Route path="/cms/giftcards" exact>
                    <GiftCards isAdmin={authorityAdmin} token={token} />
                </Route>

                <Route path='/cms/giftcards/create' >
                    <GiftCardForm token={token} />
                </Route>

                <Route path='/cms/giftcard/:id/' >
                    <GiftCardUsageOverview token={token} isAdmin={authorityAdmin} />
                </Route>

                <Route path='/cms/giftcards/edit/:id' >
                    <GiftCardForm token={token} />
                </Route>

                <Route path="/cms/newsletter" exact>
                    <NewsletterOverview token={token} isManufacturer={authorityManufacturer} isAdmin={authorityAdmin}/>
                </Route>

                <Route path="/cms/statistics" exact>
                    <StatisticsPage token={token} isManufacturer={authorityManufacturer} isAdmin={authorityAdmin}/>
                </Route>

                <Route path="/cms/products/" exact>
                    <Products token={token} layout="table" isAdmin={authorityAdmin} />
                </Route>

                <Route path='/cms/products/create' exact>
                    <ProductForm mode="add" token={token} />
                </Route>

                {/*<Route path='/cms/products/:id' exact>*/}
                   {/*<DetailsProduct token={token} isAdmin={authorityAdmin}/>*/}
                {/*</Route>*/}

                <Route path='/cms/products/edit/:id'>
                    <ProductForm mode="edit" token={token} />
                </Route>

                <Route  path='/cms/orders/' exact>
                    <Orders isAdmin={authorityAdmin} token={token}/>
                </Route>

                <Route path='/cms/orders/create' exact>
                    <OrderForm mode="add" token={token} />
                </Route>

                <Route path='/cms/orders/:id' exact>
                    {/*<DetailsOrder />    */}
                </Route>

                <Route path='/cms/orders/edit/:id' exact>
                    <OrderForm mode="edit" token={token} />
                </Route>


                <Route path="/cms/users" exact>
                    <UserManagement isAdmin={authorityAdmin} token={token}/>
                </Route>

                <Route path='/cms/users/create'>
                    <UserForm mode="add" token={token} />
                </Route>

                <Route path="/cms/users/:id">
                    {/*<UserDetails token={token}/>*/}
                </Route>

                <Route path="/cms/users/edit/:id">
                    <UserForm mode="edit" token={token} />
                </Route>

            </main>
        </>
    )
}

export default CMSLayout;