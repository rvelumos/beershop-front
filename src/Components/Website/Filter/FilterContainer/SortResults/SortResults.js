import React from "react";
import './SortResults.css';

const SortResults = ({setSortResults}) => {

    function updateFilterSort(e) {
        const value = e.target.value;
        if (value !== "") {
            setSortResults(value);
        }
    }

    return (
        <label>
            <select className="sort" name="sort" onChange={(e) => updateFilterSort(e)}>
                <option value="">Sorteren op:</option>
                <option value="name_asc">Naam (oplopend)</option>
                <option value="name_desc">Naam (aflopend)</option>
                <option value="discount_asc">Korting (oplopend)</option>
                <option value="discount_desc">Korting (aflopend)</option>
                <option value="price_asc">Prijs (oplopend)</option>
                <option value="price_desc">Prijs (aflopend)</option>
            </select>
        </label>
    )
}

export default SortResults;