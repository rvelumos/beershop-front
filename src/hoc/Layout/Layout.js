import React from 'react';
import TopNavigation from "../../Components/Navigation/TopNavigation/TopNavigation";
import Products from "../../Components/Products/Products";

function Layout () {
    return (
        <>
        <div className="App">
            <header className="App-header">
                <TopNavigation/>
            </header>
            <main>
                <Products/>
            </main>
        </div>
    </>
    );
}

export default Layout;