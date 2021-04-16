import React, { useState, useEffect } from 'react';
import './FilterSelectionMenu.css';
import axios from "axios";
import FilterBlockItems from "./FilterBlock/FilterBlockItem/FilterBlockItem";

function FilterSelectionMenu () {

    const [categories, setCategories] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function getCategories() {

            setError(false);

            let url = `http://localhost:8080/api/v1/products/categories/`;

            try {
                const result = await axios.get(url);
                if (result.data.length > 0){
                    setCategories(result.data);
                } else {
                    setCategories("");
                    setError("Geen resultaten");
                }
            } catch (e) {
                console.error(error);
                setError("Fout bij ophalen gegevens.");
            }
        }

        getCategories();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="FilterSelectionMenu">
            <form>
                <div className="filterTitle">
                    <h3>Categorie</h3>
                    <FilterBlockItems valueName="category" filterItems={categories} />
                </div>

                <div className="filterTitle">
                    <h3>Type</h3>
                </div>

                <div className="filterTitle">
                    <h3>Prijs</h3>
                </div>
            </form>
        </div>
    )
}

export default FilterSelectionMenu;