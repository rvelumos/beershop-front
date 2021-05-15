import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './BreadCrumbs.css';

function BreadCrumbs({sublink, sublink2, sublink3, activeItem}) {
    const [firstLevel, setFirstLevel] = useState(false);
    const [secondLevel, setSecondLevel] = useState(false);
    const [thirdLevel, setThirdLevel] = useState(false);
    const [active, setActive] = useState(false);
    const [mode, setMode] = useState('init');

    if(mode === 'init') {
        if (sublink !== undefined) {
            setFirstLevel(true);
        }

        if (sublink2 !== undefined) {
            setSecondLevel(true);
        }

        if (sublink3 !== undefined) {
            setThirdLevel(true);
        }

        if (activeItem !== undefined) {
            setActive(true);
        }
        setMode('data');
    }

    function niceFormat(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    return(
        <div className="breadCrumbsContainer" >
            <Link to="/">Home</Link>
            {firstLevel &&
                <><Link to={`/${sublink}`}>{niceFormat(sublink.replace("-", " "))}</Link></>
            }
            {secondLevel &&
                <><Link to={`/${sublink2}`}>{niceFormat(sublink2.replace("-", " "))}</Link></>
            }
            {thirdLevel &&
                <><Link to={`/${sublink3}`}>{niceFormat(sublink3.replace("-", " "))}</Link></>
            }
            {active &&
                <><span>{activeItem}</span></>
            }
        </div>
    )
}

export default BreadCrumbs;