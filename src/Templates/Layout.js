import { Route} from "react-router-dom";
import React from "react";

import TopNavigation from "../Components/Website/Navigation/TopNavigation/TopNavigation";
import OfferBanner from "../Components/Products/OfferBanner/OfferBanner";
import Footer from "../Components/Website/UI/Footer/Footer";
import Newsletter from "../Components/Website/Newsletter/Newsletter";
import MainRouting from "./Routing/MainRouting";
import UserProfileRouting from "./Routing/UserprofileRouting";

const Layout = (props) => {

    const { userLoggedIn } = props;

    return(
        <>
            <header className="App-header-block">
            <TopNavigation/>
                <Route path="/" exact>
                    <OfferBanner image="1" text="La Chouffe in de aanbieding!" />
                </Route>
            </header>

            <main>
                <MainRouting />
                <UserProfileRouting userLoggedIn={userLoggedIn} />
             </main>

            <Newsletter />
            <footer>
                <Footer />
            </footer>
            <div className="copyright">
                <small>Copyright Beershop 2021</small>
            </div>
        </>
    )
}

export default Layout;



