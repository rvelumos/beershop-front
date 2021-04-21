import React, {useEffect, useState} from 'react';
import './FilterBlockItem.css';
import axios from "axios";

function FilterBlockItems(props) {

    const [checked, setChecked] = useState('');
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(true);

    const {categoryArray, setCategoryArray} = props;
    const {tasteArray, setTasteArray, valueName} = props;

    console.log("de valueName bovenaan is" + valueName);

    useEffect(() => {
        async function getFilterItem({setFilterItems}) {

            setError(false);
            toggleLoading(true);

            let url = `/api/v1/products/`;

            if(valueName==="category")
                url=`${url}categories/`;
            else
                url=`${url}tastes/`;

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setFilterItems({
                        valueName: result.data
                    })
                } else {
                    setFilterItems({
                        valueName: ''
                    })
                    setError("Geen resultaten");
                }
                toggleLoading(false);
            } catch (e) {
                console.error(error);
                setError("Fout bij ophalen gegevens.");
            }
        }

        getFilterItem(props);

        // eslint-disable-next-line
    }, []);

    const handleClick = (evt) => {

        const value = evt.target.value;
        const name = evt.target.name;

        console.log("de valuename is nu " + name);

        if(name==='category[]')
            setCategoryArray(prev => [...prev, value]);
        else
            setTasteArray(prev => [...prev, value]);

        let areInputsChecked = [checked];
        areInputsChecked.forEach(isInputChecked => {
            if(isInputChecked.value === value && isInputChecked.name===name){
                isInputChecked.isChecked = evt.target.checked;
            } else {
                const catArr = [categoryArray]
                const index = catArr.indexOf(value);
                catArr.splice(index, 1);
                //setCategoryArray(catArr);
                //console.log("de nieuwe array in checked: " + categoryArray);
            }
        })

        // setFilterSearch({
        //     ...filterSearch, value,
        // });

        setChecked(prev => [...prev, value]);

        console.log("taste array " + tasteArray);
        console.log("category array " + categoryArray);
    }

    const displayFilterBlockItems = (props) => {
        const {filterItems, valueName} = props;

        if(filterItems.valueName.length  > 0) {
            filterItems.valueName = filterItems.valueName.filter(e => e.id !== 999);
            return (
                filterItems.valueName.map((filterItem) => {
                        return (
                            <>
                                <div key={filterItem.id} className="filterItem">
                                    <input
                                        type="checkbox"
                                        placeholder=""
                                        name={valueName + "[]"}
                                        id={filterItem.name}
                                        className="filterItemInput"
                                        value={filterItem.id}
                                        onClick={(e) => handleClick(e)}
                                    />
                                    <label htmlFor={filterItem.name}>{filterItem.name}</label>
                                </div>
                            </>
                        )
                })
            )
        }
    }
    return(
        <>
            {loading ? <p>loading...</p> : displayFilterBlockItems(props)}
        </>
    )
}

export default FilterBlockItems;