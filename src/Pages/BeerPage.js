import React, {useState} from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";
import FilterLabels from "../Components/Website/Filter/FilterContainer/FilterLabels/FilterLabels";
import FilterModalMenu from "../Modal/FilterModalMenu/FilterModalMenu";
import BreadCrumbs from "../Components/Website/Navigation/BreadCrumbs/BreadCrumbs";
import SortResults from "../Components/Website/Filter/FilterContainer/SortResults/SortResults";

const BeerPage = () => {

    const [categoryArray, setCategoryArray] = useState('');
    const [filterLabels, setFilterLabels] = useState('');
    const [sortResults, setSortResults] = useState('');

    return (
        <>
            <div className="mainTop">
                <BreadCrumbs
                    activeItem="Alle bieren"
                />
            </div>

            <div className="mainContent">
                <FilterSelectionMenu
                    categoryArray={categoryArray}
                    filterLabels={filterLabels}
                    setFilterLabels={setFilterLabels}
                    setCategoryArray={setCategoryArray}
                />

                <div className="rightContentContainer">
                    <div className="filterSection">
                        <FilterLabels
                            filterLabels={filterLabels}
                            setFilterLabels={setFilterLabels}
                            filterItems
                            setCategoryArray={setCategoryArray}
                            categoryArray={categoryArray}
                        />

                        <SortResults
                            sortResults={sortResults}
                            setSortResults={setSortResults}
                        />

                        <FilterModalMenu
                            categoryArray={categoryArray}
                            filterLabels={filterLabels}
                            setFilterLabels={setFilterLabels}
                            setCategoryArray={setCategoryArray}
                        />
                    </div>

                    <div className="ProductOverview">
                        <Products
                            type="1"
                            categoryArray={categoryArray}
                            setCategoryArray={setCategoryArray}
                            sortResults={sortResults}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BeerPage;