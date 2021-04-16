import React, {useState} from 'react';
import './FilterBlockItem.css';
import { v4 as uuidv4 } from 'uuid';

function FilterBlockItems(props) {

    const [filterSearch, setFilterSearch] = useState('');
    const [checked, setChecked] = useState('');

    const handleClick = (evt) => {

        //const value = evt.target.value;

        // setFilterSearch({
        //     ...filterSearch, value,
        // });

        evt.target.checked = true;

        const checkboxes = evt.currentTarget.getElementsByTagName("input");
        const filters = [];
        Object.values(checkboxes).map(checkbox => {
            if (checkbox.checked) {
                filters.push(checkbox.value);
            }
        });

        setFilterSearch(filters);
        console.log(filters);
    }

    const displayFilterBlockItems = (props) => {
        const {filterItems, valueName} = props;

        if(filterItems.length  > 0) {
            return (
                filterItems.map((filterItem) => {
                    return (
                        <>
                        <div key={uuidv4()} className="filterItem">
                                    <input
                                        type="checkbox"
                                        placeholder=""
                                        name={valueName+"[]"}
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
            {displayFilterBlockItems(props)}
        </>
    )
}

export default FilterBlockItems;