import React, {useState} from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

const BeerPage = () => {

    const [categoryArray, setCategoryArray] = useState('');
    const [tasteArray, setTasteArray] = useState('');


    return (
        <>
            <FilterSelectionMenu
                categoryArray={categoryArray}
                tasteArray={tasteArray}
                setCategoryArray={setCategoryArray}
                setTasteArray={setTasteArray}
            />

            {/*<AppliedFilters />*/}

            <div className="ProductOverview">
                <Products type="1" categoryArray={categoryArray} setCategoryArray={setCategoryArray} />
            </div>
        </>
    )
}

export default BeerPage;