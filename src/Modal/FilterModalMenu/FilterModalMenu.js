import React,{useState} from 'react';
import './FilterModalMenu.css';
import FilterSelectionMenu from "../../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

function FilterModalMenu({setCategoryArray, setFilterLabels, setTasteArray, filterLabels, categoryArray, tasteArray}) {
    const [openFilterMenuModal, setOpenFilterMenuModal] = useState(false);

    const toggleFilterMenuModal = () => {
        setOpenFilterMenuModal(!openFilterMenuModal);
    }

    let className;
    if(openFilterMenuModal)
        className = "open";
    else
        className = "closed";

    return (
        <>
            <div className="filterIconContainer">
                <div className={className} onClick={(e) => toggleFilterMenuModal()}>
                    <img src="/icons/icon_filter.png" alt='' />
                </div>
            </div>

            {openFilterMenuModal &&
            <div className="filterModal">
                <div className="filterContainer">
                    <div className="closeIcon" onClick={(e) => toggleFilterMenuModal()}>&#10007;</div>
                    <div className="filterMenuItems">
                        <FilterSelectionMenu
                            categoryArray={categoryArray}
                            tasteArray={tasteArray}
                            filterId="Mobile"
                            filterLabels={filterLabels}
                            setFilterLabels={setFilterLabels}
                            setCategoryArray={setCategoryArray}
                            setTasteArray={setTasteArray}
                        />
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default FilterModalMenu;