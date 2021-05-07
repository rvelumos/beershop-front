import React from "react";
import {Route} from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import SearchResultsPage from "../../Pages/SearchResultsPage";
import DetailsProduct from "../../Components/Products/Product/DetailsProduct/DetailsProduct";
import BeerPage from "../../Pages/BeerPage";
import ProductOfferPage from "../../Pages/ProductOfferPage";
import ContactPage from "../../Pages/ContactPage";
import GiftPage from "../../Pages/GiftPage";
import PacketPage from "../../Pages/PacketPage";
import CheckoutPage from "../../Pages/CheckoutPage";
import CheckoutSteps from "../../Components/Website/Forms/CheckoutForms/CheckoutSteps";
import RegistrationForm from "../../Components/Website/Forms/RegistrationForm/RegistrationForm";
import InfoRouting from "./InfoRouting";

const MainRouting = () => {

    return (
        <>
            <Route path="/" exact>
                <HomePage />
            </Route>

            <Route path="/zoeken/:searchResult">
                <SearchResultsPage />
            </Route>

            <Route path="/product/:id" exact>
                <DetailsProduct />
            </Route>

            <Route path="/alle-bieren">
                <BeerPage />
            </Route>

            <Route path="/aanbiedingen">
                <ProductOfferPage />
            </Route>

            <Route path="/contact">
                <ContactPage />
            </Route>

            <Route path="/cadeaubonnen">
                <GiftPage />
            </Route>

            <Route path="/pakketten">
                <PacketPage />
            </Route>

            <Route path="/winkelwagen" exact>
                <CheckoutPage />
            </Route>

            <Route path="/winkelwagen/checkout/stappen">
                <CheckoutSteps />
            </Route>

            <Route path="/registreren/">
                <RegistrationForm mode="add" />
            </Route>

            <Route path="/info/">
                <InfoRouting />
            </Route>
        </>
    )
}

export default MainRouting;
