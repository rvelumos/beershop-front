import React from 'react';

function FilterLabels({filterLabels, setFilterlabels}) {

    function handleClick() {

    }

    function getFilterLabelItems() {

        if(filterLabels.length > 0) {
            return (
                filterLabels.map((filterlabel) => {
                    return (
                        <div className="filterLabel">
                            {filterlabel.name}
                            <div className="removeFilterLabel" onClick={(e) => handleClick(e.target.name)}></div>
                        </div>
                    )
                })
            )
        }
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