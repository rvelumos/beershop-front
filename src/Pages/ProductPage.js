import React from 'react';
import Products from "../Components/Products/Products";
import FilterSelectionMenu from "../Components/Website/Filter/FilterSelectionMenu/FilterSelectionMenu";

const ProductPage = (props) => {




    const [amountItem, setAmountItem] = useState('');

    function AddToCart (e){
        e.preventDefault();

        // history.push({
        //     pathname: `/winkelwagen/`,
        //     state: { data: amountItem}
        // });
    }

    function handleChange(evt) {

        const value = evt.currentTarget.value;

        setAmountItem({
            beer_1 : value
        });
        console.log(amountItem);
    }


    let current_value="";
    for (const [key, value] of Object.entries(amountItem)) {
        current_value=value;
    }
    return (
        <div className="productOrder">
            <form onSubmit={AddToCart} method="POST">
                <input
                    type="text"
                    placeholder=""
                    maxLength="2"
                    name="beer_1"
                    value={current_value}
                    //onBlur={(e) => handleChange(e)}
                    //onChange={setTimeout((e) => handleChange(e), 800)}
                    onChange={evt => handleChange(evt)}
                />

                <button value="Bestellen" usage="buttonCheckout" name="cart" type="cart"/>
            </form>
        </div>
    );
}







// const {setSearchHandler} = props;
//     return (
//         <>
//         <FilterSelectionMenu />
//
//         {/*<AppliedFilters />*/}
//
//         <Products type="1" setSearchHandler={setSearchHandler} />
//         </>
//     )
// }

export default ProductPage;