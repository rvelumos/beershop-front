import React, { useState }from 'react';
import TopNavigationMenuItem from "./TopNavigationMenuItem/TopNavigationMenuItem";
import SearchBar from "./SearchBar/SearchBar";
import './TopNavigationItems.css';
import UserMenu from "../../UserMenu/UserMenu";

const TopNavigationItems = () => {

    const [search, setSearch] = useState("");

    return (
        <>
         <div className="TopNavigationItems">
            <div className="LogoContainer">

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
                        <TopNavigationMenuItem url="/pakketten" name="pakketten" />
                        <TopNavigationMenuItem url="/cadeaubonnen" name="cadeaubon" />
                        <TopNavigationMenuItem url="/aanbiedingen" name="aanbiedingen" />
                        </div>

                          <div className="TopNavigationIcon" >
                              <UserMenu />
                          </div>
                  </div>
             </div>
         </div>
        </>
    )
}

export default TopNavigationItems;