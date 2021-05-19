import React, {useContext, useState} from 'react';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";

const Confirmation = ({email, currentStep, token, orderItems, formData}) => {

    const [mode, setMode] = useState('init');
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState('');
    const [orderAdded, setOrderAdded] = useState(false);

    const { username } = useContext(AuthContext);

    if(currentStep !== 4) {
        return null;
    }

    async function addCustomer(data, username) {
        const addressData = {
            street: data.street,
            streetAdd: data.streetAdd,
            number: data.number,
            postalCode: data.postalCode,
            city: data.city,
            province: data.province,
            country: data.country
        }

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
            if(result) {
                url = `/api/v1/address/`;
                try {
                    const result = await axios.post(url, addressData);
                    if(result) {
                        if(!orderAdded) {
                            addOrder(username);
                        }
                    }
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken adresdata.");
                }
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken persoonsgegevens.");
        }
    }

    function finishOrder(username) {
        console.log('finishorder');
        if (mode === 'init' && orderItems !== "" && username !== undefined) {
            console.log('init');
            if (token === '') {
                addCustomer(formData);
            } else {
                if(!orderAdded) {
                    addOrder(username);
                }
            }

            setMode('data');
        }
    }

        async function addOrder(username) {
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
                const url = '/api/v1/order/create';
                const result = await axios.post(url, itemData);
                    if(result) {
                        setOrderAdded(true);
                        toggleLoading(false);
                        await sendConfirmationMail(formData);
                        window.history.replaceState({}, document.title)
                    }
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken data.");
                }

        }

        async function sendConfirmationMail(formData) {
            const data = {
                email: formData.email,
                lastname: formData.lastname
            }

            try {
                const url = `/api/v1/customer/confirmation`;
                const result = await axios.post(url, data);
                if(result) {
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