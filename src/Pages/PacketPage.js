import React from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

const PacketPage = () => {

    return (
        <>
        <FilterSelectionMenu />

        {/*<AppliedFilters />*/}

        <div className="ProductOverview">
            <Products type="2" get="all"/>
        </div>
        </>
    )
}

export default PacketPage;