import React from 'react';
import FilterBlockItems from "../../FilterSelectionMenu/FilterBlock/FilterBlockItem/FilterBlockItems";

function FilterLabels({filterItems, setFilterItems}) {

    function handleClick() {

    }

    function replaceNumberToName() {

    }

    function getFilterLabelItems() {
        // if(filterItems.length > 0) {
        //     return (
        //         filterItems.map((filterlabel) => {
        //             console.log("het is "+filterlabel);
        //             return (
        //                 <div className="filterLabel">
        //                     {filterlabel}
        //                     <div className="removeFilterLabel" onClick={(e) => handleClick(e.target.name)}></div>
        //                 </div>
        //             )
        //         })
        //     )
        // }
    }

    return(
        <div className="filterLabelOverview">
            <div>
                {getFilterLabelItems()}
            </div>
        </div>
    )
}

export default FilterLabels;