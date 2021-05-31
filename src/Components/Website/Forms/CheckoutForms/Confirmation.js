import React, {useContext, useState} from 'react';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";

const Confirmation = ({email, currentStep, token, orderItems, shipmentData}) => {
    const [mode, setMode] = useState('init');
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState('');

    const { username } = useContext(AuthContext);

    if(currentStep !== 4) {
        return null;
    }

    async function addCustomer(data) {
        const customerData = {
            sex: data.sex,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            birthDate: data.birthDate
        }

        let url = `/api/v1/customer/`;
        try {
            const result = await axios.post(url, customerData);
            if(!result) {
                setError("Fout opslaan gegevens")
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken persoonsgegevens.");
        }
    }

    function finishOrder(username) {
        if (mode === 'init' && orderItems !== "" && username !== undefined) {
            if (token === '') {
                addCustomer(username);
            } else {
                addOrder(shipmentData, username);
            }
            setMode('data');
        }
    }

    async function addOrder(shipmentData, username) {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth()+1;
        const yyyy = today.getFullYear();
        const orderDate =  dd+'-'+mm+'-'+yyyy;

        const itemData = {
            username: username,
            priceTotal: orderItems.subTotal,
            orderDate: orderDate,
            orderStatus: 'NEW_ADDED',
            invoiceStatus: 'UNPAID',
        }

        try {
            let url = `/api/v1/shipping/`;
            const result = await axios.post(url, shipmentData);
            if(result) {
                try {
                    url = '/api/v1/order/create';
                    const result = await axios.post(url, itemData);
                    if (result) {
                        toggleLoading(false);
                        if (orderItems.giftcardId !== undefined)
                            await updateGiftCard();
                        await sendConfirmationMail(shipmentData);
                        window.history.replaceState({}, document.title)
                    }
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken data.");
                }
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken data.");
        }
    }

    async function updateGiftCard() {
        try {
            const url = `/api/v1/admin/products/discounts/usage/${orderItems.giftcardId}`;
            const result = await axios.post(url, {
                uses: 1
            });

            if(!result)
                setError("Fout bij aanpassen gebruik");
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken data.");
        }
    }

    async function sendConfirmationMail(shipmentData) {
        const data = {
            email: shipmentData.email,
            lastname: shipmentData.lastname
        }

        try {
            const url = `/api/v1/customer/confirmation`;
            const result = await axios.post(url, data);
            if(result) {
                localStorage.removeItem('shopping_carts');
                toggleLoading(false);
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verzenden emailbevestiging.");
        }
    }

    return(
        <>
            {loading ? <><LoadingIndicator /> {finishOrder(username)}</>
                :
                error ? <p className="errorContainer">{error}</p>
                    : <div className="Confirmation">
                        <h1>Je bestelling is gelukt!</h1>
                        <p>Er zal een bevestiging worden gestuurd naar: {email}. We wensen je alvast veel drinkgenot met
                            jouw aankoop!</p>
                    </div>
            }
        </>
    )
}

export default Confirmation;