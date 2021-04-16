import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './SearchBar.css';

 function SearchBar (props) {
     let history = useHistory();

     const {setSearchHandler} = props;
     const [query, setQuery] = useState('');

     function handleClick() {
         setSearchHandler(query);
         console.log(query);
         history.push({
             pathname: `/zoeken/${query}`,
             state: { search: query}
         });
     }

     function keyPressCheck(e) {
         if (e.keyCode === 13) {
             setSearchHandler(query);
             history.push({
                 pathname: `/zoeken/${query}`,
                 state: { search: query}
             });
         }
     }

    return(
        <div className="searchBarContainer">
            <input
                type="text"
                placeholder="Voer een zoekopdacht in..."
                className="searchBar"

                onChange={(e) => setQuery(e.target.value.replace(/[^\w\s]/gi, ""))}
                onKeyUp={keyPressCheck}
                name="zoekwoord"
            />
            <button
                type="button"
                onClick={handleClick}>
            </button>
        </div>
    );
}

export default SearchBar;