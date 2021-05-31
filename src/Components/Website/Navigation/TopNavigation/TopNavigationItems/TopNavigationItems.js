import React, { useState }from 'react';
import TopNavigationMenuItem from "./TopNavigationMenuItem/TopNavigationMenuItem";
import SearchBar from "./SearchBar/SearchBar";
import './TopNavigationItems.css';
import UserMenu from "../../UserMenu/UserMenu";
import {useHistory} from "react-router";
import HamburgerMenu from "../../../../../Modal/HamburgerMenu/HamburgerMenu";

const TopNavigationItems = () => {
    const [search, setSearch] = useState("");
    const history = useHistory();

    function goHome(e) {
        history.push("/");
    }

    return (
        <>
         <div className="TopNavigationItems">
            <div className="LogoContainer" onClick={(e)=>goHome(e)}>

            </div>
             <div className="TopNavigationRightContent">
                 <div className="TopNavigationUpperSection">
                     <div className="TopNavigationSearch" >
                         <SearchBar search={search} setSearchHandler={setSearch} />
                         <span>
                             <ul className="TopNavigationInfo">
                                <li>Voor 17:00 besteld, morgen in huis!</li>
                                <li>Vanaf €24.95 gratis verzending!</li>
                                <li>Veilig verpakt</li>
                             </ul>
                         </span>
                     </div>
                 </div>

                  <div className="TopNavigationBottomSection">
                        <div className="TopNavigationMenu" >
                        <TopNavigationMenuItem url="/alle-bieren" name="bieren" />
                        <TopNavigationMenuItem url="/alle-pakketten" name="pakketten"  />
                        <TopNavigationMenuItem url="/cadeaubonnen" name="cadeaubon"  />
                        <TopNavigationMenuItem url="/aanbiedingen" name="aanbiedingen"  />
                        </div>

                        <div className="TopNavigationIcon" >
                            <UserMenu />
                        </div>

                        <HamburgerMenu />
                  </div>
             </div>
         </div>
            <div className="searchMobile">
                <SearchBar search={search} setSearchHandler={setSearch} />
            </div>
        </>
    )
}

export default TopNavigationItems;