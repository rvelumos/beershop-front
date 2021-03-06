import { Route} from "react-router-dom";
import React from "react";

import TopNavigation from "../Components/Website/Navigation/TopNavigation/TopNavigation";
import OfferBanner from "../Components/Products/OfferBanner/OfferBanner";
import Footer from "../Components/Website/UI/Footer/Footer";
import Newsletter from "../Components/Website/Newsletter/Newsletter";
import MainRouting from "./Routing/MainRouting";
import UserProfileRouting from "./Routing/UserprofileRouting";

const Layout = (props) => {
    const { userLoggedIn, token } = props;
    const randomInt = Math.floor(Math.random() * 4) + 1;

    return(
        <>
            <header className="App-header-block">
            <TopNavigation/>
                <Route path="/" exact>
                    <OfferBanner image="1" text="La Chouffe in de aanbieding!" />
                </Route>
                <Route path="/contact" exact>
                    <OfferBanner image={randomInt} text="Spaar voor leuke producten!" />
                </Route>

                <Route path="/info">
                    <OfferBanner image={randomInt} text="Elke week nieuwe aanbiedingen!" />
                </Route>
            </header>

            <main>
                <MainRouting />
                <UserProfileRouting token={token} userLoggedIn={userLoggedIn} />
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



