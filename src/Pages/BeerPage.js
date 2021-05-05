import React, {useState} from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";
import FilterLabels from "../Components/Website/Filter/FilterContainer/FilterLabels/FilterLabels";

const BeerPage = () => {

    const [categoryArray, setCategoryArray] = useState('');
    const [filterLabels, setFilterLabels] = useState('');
    const [tasteArray, setTasteArray] = useState('');


    return (
        <>
            <FilterSelectionMenu
                categoryArray={categoryArray}
                tasteArray={tasteArray}
                filterLabels={filterLabels}
                setFilterLabels={setFilterLabels}
                setCategoryArray={setCategoryArray}
                setTasteArray={setTasteArray}
            />

            <FilterLabels
                filterLabels={filterLabels}
                setFilterLabels={setFilterLabels}
                setCategoryArray={setCategoryArray}
                categoryArray={categoryArray}
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