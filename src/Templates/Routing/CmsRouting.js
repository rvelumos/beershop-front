import {Route} from "react-router-dom";
import AdminHomePage from "../../Pages/Admin/AdminHomePage";
import GiftCards from "../../Components/GiftCards/GiftCards";
import GiftCardUsageOverview from "../../Components/GiftCards/GiftCard/GiftCardUsageOverview/GiftCardUsageOverview";
import NewsletterOverview from "../../Components/Cms/NewsletterOverview/NewsletterOverview";
import StatisticsPage from "../../Pages/Statistics/StatisticsPage";
import Products from "../../Components/Products/Products";
import Orders from "../../Components/Orders/Orders";
import UserManagement from "../../Components/Cms/UserManagement/UserManagement";

import {AddEditForm as GiftCardForm} from "../../Components/GiftCards/GiftCard/AddEditForm/AddEditForm";
import {AddEditForm as ProductForm} from "../../Components/Products/Product/AddEditForm/AddEditForm";
import {AddEditForm as OrderForm} from "../../Components/Orders/Order/AddEditForm/AddEditForm";
import {AddEditForm as UserForm} from "../../Components/Cms/UserManagement/AddEditForm/AddEditForm";
import {AddEditForm as NewsletterForm} from "../../Components/Cms/NewsletterOverview/AddEditForm/AddEditForm";
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const CmsRouting = ({authorityAdmin, authorityManufacturer, token}) => {

    const { username } = useContext(AuthContext);

    return (
        <>
            <Route path="/cms" exact>
                <AdminHomePage username={username} />
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

            <Route path="/cms/newsletter/edit/:id" exact>
                <NewsletterForm token={token} />
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

            <Route path="/cms/users/:username">
                {/*<UserDetails token={token}/>*/}
            </Route>

            <Route path="/cms/users/edit/:username">
                <UserForm mode="edit" token={token} />
            </Route>
        </>
    )
}

export default CmsRouting;