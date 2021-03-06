import {Redirect, Route} from "react-router-dom";
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
import NewsletterSubscriberOverview
    from "../../Components/Cms/NewsletterOverview/NewsletterSubscribers/NewsletterSubscriberOverview";

const CmsRouting = ({isAdmin, token}) => {
    const { username } = useContext(AuthContext);

    return (
        <>
            <Route path="/cms" exact>
                <AdminHomePage username={username} />
            </Route>

            <Route path="/cms/statistics" exact>
                <StatisticsPage token={token} />
            </Route>

            {isAdmin ?
                <>
                     <Route path="/cms/giftcards" exact>
                        <GiftCards isAdmin={isAdmin} token={token} />
                     </Route>

                     <Route path='/cms/giftcards/create' >
                        <GiftCardForm token={token} />
                     </Route>

                     <Route path='/cms/giftcard/:id/' >
                        <GiftCardUsageOverview token={token} isAdmin={isAdmin} />
                    </Route>

                    <Route path='/cms/giftcards/edit/:id' >
                        <GiftCardForm token={token} />
                    </Route>

                    <Route path="/cms/newsletter" exact>
                        <NewsletterOverview token={token} isAdmin={isAdmin}/>
                    </Route>

                    <Route path='/cms/newsletter/create' >
                        <NewsletterForm token={token} />
                    </Route>

                    <Route path='/cms/newsletter/subscribers' >
                        <NewsletterSubscriberOverview token={token} />
                    </Route>

                    <Route path="/cms/newsletter/edit/:id">
                        <NewsletterForm token={token} />
                    </Route>

                    <Route path="/cms/products/" exact>
                        <Products token={token} layout="table" isAdmin={isAdmin} />
                    </Route>

                    <Route path='/cms/products/create' exact>
                        <ProductForm mode="add" token={token} />
                    </Route>

                    <Route path='/cms/products/edit/:id'>
                        <ProductForm mode="edit" token={token} />
                    </Route>

                    <Route  path='/cms/orders/' exact>
                        <Orders isAdmin={isAdmin} token={token}/>
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
                        <UserManagement isAdmin={isAdmin} token={token}/>
                    </Route>

                    <Route path='/cms/users/create'>
                        <UserForm mode="add" token={token} />
                    </Route>

                    <Route path="/cms/users/edit/:username">
                        <UserForm mode="edit" token={token} />
                    </Route>
                 </>
            : <Redirect to="/cms/" />}
        </>
    )
}

export default CmsRouting;