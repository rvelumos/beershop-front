import React from 'react';
import Products from "../Components/Products/Products";
import {useParams} from "react-router";
import BreadCrumbs from "../Components/Website/Navigation/BreadCrumbs/BreadCrumbs";

const SearchResult = () => {

    const { searchResult } = useParams();

    return (
        <>
            <div className="mainTop">
                <BreadCrumbs
                    activeItem="Zoekresultaten"
                />
            </div>

            <div className="mainContent">
                <div className="SearchOverview">
                    <h2>Gevonden resultaten voor: <b>{searchResult}</b></h2>
                    <Products />
                </div>
            </div>
        </>
    )
}

export default SearchResult;