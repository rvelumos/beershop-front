import React from 'react';
import {Route} from "react-router-dom";
import ConditionPage from "../../Pages/Info/ConditionPage";
import FaqPage from "../../Pages/Info/FaqPage";
import PrivacyPage from "../../Pages/Info/PrivacyPage";
import DeliveryPage from "../../Pages/Info/DeliveryPage";

const InfoRouting = () => {
    return(
        <>
            <Route path="/info/voorwaarden">
                <ConditionPage />
            </Route>

            <Route path="/info/faq">
                <FaqPage/>
            </Route>

            <Route path="/info/privacy">
                <PrivacyPage />
            </Route>

            <Route path="/info/bezorging">
                <DeliveryPage />
            </Route>
        </>
    )
}

export default InfoRouting;