import React, {useContext, useState, useEffect} from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import BonusProducts from "../../Components/Website/UserProfile/BonusProducts/BonusProducts";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

import Feedback from "../../Components/Website/UI/Feedback/Feedback";

const UserBonusPage = () => {
    const { username } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [customerPoints, setCustomerPoints] = useState(false);

    useEffect(() => {
        getBonusBalance(username);
        // eslint-disable-next-line
    }, []);

    async function getBonusBalance (username) {
        let url = `/api/v1/customer/${username}`;

        try {
            const response = await axios.get(url);
            if (response) {
                const points = response.data[0].customerPoints;
                setCustomerPoints(points);
            }
        } catch(e) {
            console.error(e);
            setError("could not reach external source");
        }
    }

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Bonus producten</h1>
                    <p>Bij elke order die jij plaatst ontvang je bonuspunten. Hiermee kan je voor onderstaande producten sparen, wanneer je voldoende punt hebt gespaard kan je het item toevoegen aan je winkelwagen.</p>
                    {customerPoints && <p>Jouw spaarsaldo is: <b>{customerPoints}</b></p>}
                    {error && <Feedback type="error" message={error} />}
                    <div className="bonusContainer">
                        <BonusProducts customerPoints={customerPoints} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserBonusPage;