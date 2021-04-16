import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";
import BonusProducts from "../../Components/Website/UserProfile/BonusProducts/BonusProducts";

const UserBonusPage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="userContentContainer" >
                    <h1>Bonus producten</h1>
                    <p>Bij elke order die jij plaatst ontvang je bonuspunten. Hiermee kan je voor onderstaande producten sparen, wanneer je voldoende punt hebt gespaard kan je het item toevoegen aan je winkelwagen.</p>

                    <BonusProducts />
                </div>
            </div>
        </>
    )
}

export default UserBonusPage;