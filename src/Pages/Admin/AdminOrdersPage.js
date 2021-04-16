import React from 'react';
import Button from "../../Components/UI/Button/Button";

const AdminOrderPage = () => {

    return (
        <>
            <div className="contentContainer">
                <Button value="Order handmatig toevoegen" />
                <Orders />
            </div>
        </>
    )
}

export default AdminOrderPage;