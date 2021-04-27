import React, {useState} from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";
import FilterLabels from "../Components/Website/Filter/FilterLabels/FilterLabels";

const BeerPage = () => {

    const [categoryArray, setCategoryArray] = useState('');
    const [filterLabels, setFilterLabels] = useState('');
    const [tasteArray, setTasteArray] = useState('');


    return (
        <>
            <FilterSelectionMenu
                categoryArray={categoryArray}
                tasteArray={tasteArray}
                setFilterLabels={setFilterLabels}
                setCategoryArray={setCategoryArray}
                setTasteArray={setTasteArray}
            />

            <FilterLabels
                setFilterLabels={setFilterLabels}
                filterLabels={filterLabels}
            />

            <div className="ProductOverview">
                <Products
                    type="1"
                    categoryArray={categoryArray}
                    setCategoryArray={setCategoryArray}
                />
            </div>
        </>
    )
}

export default BeerPage;