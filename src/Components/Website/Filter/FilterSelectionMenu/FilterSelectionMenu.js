import React, { useState } from 'react';
import './FilterSelectionMenu.css';
import FilterBlockItems from "./FilterBlock/FilterBlockItem/FilterBlockItems";

function FilterSelectionMenu (props) {
    const {categoryArray, setCategoryArray, setFilterLabels, filterLabels, filterId} = props;
    const [filterItems, setFilterItems] = useState({
        filtermenu: ''
    });

    return (
        <div className="FilterSelectionMenu">
            <form>
                <div className="filterTitle">
                    <h3>Categorie</h3>
                    <FilterBlockItems
                          key={filterItems}
                          valueName="category"
                          filterId={filterId}
                          filterLabels={filterLabels}
                          setFilterLabels={setFilterLabels}
                          filterItems={filterItems}
                          setFilterItems={setFilterItems}
                          categoryArray={categoryArray}
                          setCategoryArray={setCategoryArray}
                    />
                </div>
            </form>
        </div>
    )
}

export default FilterSelectionMenu;