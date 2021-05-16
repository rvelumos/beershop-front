import React, {useEffect, useState} from 'react';
import './FilterBlockItems.css';
import axios from "axios";

function FilterBlockItems(props) {
    const [checked, setChecked] = useState('');
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(true);
    const {categoryArray, setCategoryArray, filterId} = props;
    const {setTasteArray} = props;

    useEffect(() => {
        async function getFilterItem({filterItems, setFilterItems}) {
            const {valueName} = props;

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
                    setFilterItems(prevState => ({
                        ...prevState,
                        filtermenu: {
                            ...filterItems,
                            [valueName]: result.data
                        }
                    }))
                } else {
                    setFilterItems({
                        ...filterItems,
                        [valueName]: ''
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

        if(name==='category[]') {
            setCategoryArray(prev => [...prev, value]);
        } else {
            setTasteArray(prev => [...prev, value]);
        }
        let areInputsChecked = [checked];

        areInputsChecked.forEach(isInputChecked => {
            if(isInputChecked === value && isInputChecked.name===name){
                isInputChecked.isChecked = evt.target.checked;
            } else {
               if(!evt.target.checked) {
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
               }
            }
        })
        setChecked(prev => [...prev, value]);
    }

    const displayFilterBlockItems = (props) => {
        const {filterItems, valueName} = props;

        if(filterItems.filtermenu[valueName].length  > 0) {
            const filteredFilterItems = filterItems.filtermenu[valueName].filter(e => e.id !== 999);
            return (
                filteredFilterItems.map((filterItem) => {
                        const id = filterItem.name + filterId;
                        return (
                            <div key={filterItem.id} className="filterItem">
                                <input
                                    type="checkbox"
                                    placeholder=""
                                    name={`${valueName}[]`}
                                    id={id}
                                    className="filterItemInput"
                                    value={filterItem.id}
                                    onClick={(e) => handleClick(e)}
                                />
                                <label htmlFor={id}>{filterItem.name}</label>
                            </div>
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