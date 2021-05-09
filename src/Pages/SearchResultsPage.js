import React from 'react';
import Products from "../Components/Products/Products";
import {useParams} from "react-router";

const SearchResult = () => {

    const { searchResult } = useParams();

    return (
        <div className="SearchOverview">
            <span>Gevonden resultaten voor: <b>{searchResult}</b></span>
            <Products />
        </div>
    )
}

export default SearchResult;