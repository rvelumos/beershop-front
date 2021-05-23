import React, {useState} from 'react';
import './FilterLabels.css'

function FilterLabels({categoryArray, setCategoryArray, setFilterItems}) {
    const [checked, setChecked] = useState('');

    function handleClick(value) {
        setCategoryArray(prev => [...prev, value]);

        const catArr = [...categoryArray];
        const checkedArr = [...checked];

        const index = catArr.indexOf(value);
        const index_checked = checkedArr.indexOf(value);

        if (index !== -1) {
            catArr.splice(index, 1);
            setCategoryArray(catArr);
        }
        if (index_checked !== -1) {
            checkedArr.splice(index_checked, 1);
            setChecked(checkedArr);
        }
        setChecked(prev => [...prev, value]);
    }

    function substituteNumberToName(value) {
        switch (value) {
            case "1": return "Pale Ale";
            case "2": return "Blond";
            case "3": return "Tripel";
            case "4": return "Abdij/trappist";
            case "5": return "Amber";
            case "6": return "Bruin";
            case "7": return "IPA";
            case "8": return "Lager";
            case "9": return "Pilsener";
            case "10": return "Quadrupel";
            case "11": return "Stout";
            case "12": return "Winterbier";
            case "13": return "Wit";
            case "14": return "Herfstbock";
        }
    }

    function getFilterLabelItems() {
        if(categoryArray.length > 0) {
            return (
                categoryArray.map((filterlabel) => {
                    return (
                        <div className="filterLabel">
                            {substituteNumberToName(filterlabel)}
                            <div className="removeFilterLabel" onClick={(e) => handleClick(filterlabel)}>&#10005;</div>
                        </div>
                    )
                })
            )
        }
    }

    return(
        <div className="filterLabelOverview">
                {getFilterLabelItems()}
        </div>
    )
}

export default FilterLabels;