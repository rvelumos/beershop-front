import React, { useState } from 'react';
import './FilterSelectionMenu.css';
import FilterBlockItems from "./FilterBlock/FilterBlockItem/FilterBlockItems";

function FilterSelectionMenu (props) {

    const {categoryArray, setCategoryArray, setFilterLabels, filterLabels, filterId} = props;
    //const {tasteArray, setTasteArray} = props;

    const [filterItems, setFilterItems] = useState({
        filtermenu: ''
    });

    // useEffect(() => {
    //     async function getCategories() {
    //
    //         setError(false);
    //
    //         let url = `http://localhost:8080/api/v1/products/categories/`;
    //
    //         try {
    //             const result = await axios.get(url);
    //             if (result.data.length > 0){
    //                 console.log('het eerste resultaat: '+result.data);
    //                 setCategories(result.data);
    //             } else {
    //                 setCategories("");
    //                 setError("Geen resultaten");
    //             }
    //         } catch (e) {
    //             console.error(error);
    //             setError("Fout bij ophalen gegevens.");
    //         }
    //     }
    //
    //     getCategories();
    //
    //     // eslint-disable-next-line
    // }, []);


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

                {/*<div className="filterTitle">*/}
                {/*    <h3>Type</h3>*/}
                    {/*<FilterBlockItems*/}
                    {/*    valueName="taste"*/}
                    {/*    filterItems={filterItems}*/}
                    {/*    setFilterItems={setFilterItems}*/}
                    {/*    tasteArray={tasteArray}*/}
                    {/*    setTasteArray={setTasteArray} />*/}
                {/*</div>*/}
            </form>
        </div>
    )
}

export default FilterSelectionMenu;