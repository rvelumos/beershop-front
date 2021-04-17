import React, {useState} from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

const PacketPage = () => {
    const [categoryArray, setCategoryArray] = useState('');

    return (
        <>
        <FilterSelectionMenu categoryArray={categoryArray} setCategoryArray={setCategoryArray} />

        {/*<AppliedFilters />*/}

        <div className="ProductOverview">
            <Products type="2" get="all" categoryArray={categoryArray} setCategoryArray={setCategoryArray} />
        </div>
        </>
    )
}

export default PacketPage;