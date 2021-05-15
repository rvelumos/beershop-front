import React from 'react';
import DiscountProducts from "../Components/Products/DiscountProducts/DiscountProducts";
import BreadCrumbs from "../Components/Website/Navigation/BreadCrumbs/BreadCrumbs";

const ProductOfferPage = () => {

    return (
        <>
            <div className="mainTop">
                <BreadCrumbs
                    activeItem="Aanbiedingen"
                />
            </div>

            <div className="mainContent">
                <div className="ProductOverview">
                    <DiscountProducts />
                </div>
            </div>
        </>

    )
}

export default ProductOfferPage;