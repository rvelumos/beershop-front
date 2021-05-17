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

            <Route path="/cms/giftcards" exact>
                {isAdmin ?
                    <GiftCards isAdmin={isAdmin} token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/giftcards/create' >
                {isAdmin ?
                    <GiftCardForm token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/giftcard/:id/' >
                {isAdmin ?
                    <GiftCardUsageOverview token={token} isAdmin={isAdmin} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/giftcards/edit/:id' >
                {isAdmin ?
                    <GiftCardForm token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path="/cms/newsletter" exact>
                {isAdmin ?
                    <NewsletterOverview token={token} isAdmin={isAdmin}/>
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/newsletter/create' >
                {isAdmin ?
                    <NewsletterForm token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/newsletter/subscribers' >
                {isAdmin ?
                    <NewsletterSubscriberOverview token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path="/cms/newsletter/edit/:id">
                {isAdmin ?
                    <NewsletterForm token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path="/cms/statistics" exact>
                <StatisticsPage token={token} />
            </Route>

            <Route path="/cms/products/" exact>
                {isAdmin ?
                    <Products token={token} layout="table" isAdmin={isAdmin} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/products/create' exact>
                {isAdmin ?
                    <ProductForm mode="add" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/products/edit/:id'>
                {isAdmin ?
                    <ProductForm mode="edit" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route  path='/cms/orders/' exact>
                {isAdmin ?
                    <Orders isAdmin={isAdmin} token={token}/>
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/orders/create' exact>
                {isAdmin ?
                    <OrderForm mode="add" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/orders/:id' exact>
                {/*<DetailsOrder />    */}
            </Route>

            <Route path='/cms/orders/edit/:id' exact>
                {isAdmin ?
                    <OrderForm mode="edit" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path="/cms/users" exact>
                {isAdmin ?
                    <UserManagement isAdmin={isAdmin} token={token}/>
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path='/cms/users/create'>
                {isAdmin ?
                    <UserForm mode="add" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>

            <Route path="/cms/users/:username">
                {/*<UserDetails token={token}/>*/}
            </Route>

            <Route path="/cms/users/edit/:username">
                {isAdmin ?
                    <UserForm mode="edit" token={token} />
                    : <Redirect to="/cms/" />
                }
            </Route>
        </>
    )
}

export default CmsRouting;