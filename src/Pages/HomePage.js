import React from 'react';
import Products from "../Components/Products/Products";

const HomePage = () => {

    return (
        <>
            <div className="contentContainer">
                <h1>Welkom op de Beershop website!</h1>
                <p>De plek waar je heerlijke speciaalbieren kunt kopen en kunt sparen voor leuke kortingen en producten. </p>

                <h1>Nieuwste bier</h1>
                <Products type="1" get="latest" />

                <h1>Speciale Pakketten</h1>
                <Products type="2" get="latest" />
            </div>
        </>
    )
}

export default HomePage;