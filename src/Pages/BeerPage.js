import React from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

const BeerPage = () => {

    return (
        <>
            <FilterSelectionMenu />

            {/*<AppliedFilters />*/}

            <div className="ProductOverview">
                <Products type="1" />
            </div>
        </>
    )
}

export default BeerPage;