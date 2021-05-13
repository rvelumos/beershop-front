import React, {useContext, useState} from 'react';
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";

const Confirmation = ({email, currentStep, token, orderItems, formData}) => {

    const [mode, setMode] = useState('init');
    const [loading, toggleLoading] = useState(true);
    const [userDataSaved, setUserDataSaved] = useState(false);
    const [error, setError] = useState('');

    const { username } = useContext(AuthContext);

    if(currentStep !== 4) {
        return null;
    }

    async function addCustomer(data) {
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
                        addOrder();
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

    function finishOrder() {
        console.log('finishorder');
        if (mode === 'init' && orderItems !== "") {
            console.log('init');
            if (token === '') {
                addCustomer(formData);
            } else {
                addOrder();
            }

            setMode('data');
        }
    }

        async function addOrder() {

            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth()+1;
            const yyyy = today.getFullYear();

            const orderDate =  dd+'-'+mm+'-'+yyyy;

            const itemData = {
                username: username,
                priceTotal: orderItems.priceTotal,
                orderDate: orderDate,
                orderStatus: 'NEW',
                invoiceStatus: 'UNPAID',
            }

            try {
                const url = '/api/v1/order';
                const result = await axios.post(url, itemData);
                if(result)
                    addCustomerPoints()
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken data.");
                }

        }

        async function addCustomerPoints() {
            const earnedPoints = orderItems.totalPrice * 5;
            const customerId = orderItems.customerId;

            try {
                const url = `/api/v1/customer/${customerId}`;
                const result = await axios.put(url, {
                    customerPoints: earnedPoints
                });
                if(result) {
                    toggleLoading(false);
                    sendConfirmationMail();
                }

            } catch (e) {
                console.error(e);
                setError("Fout bij verwerken data.");
            }
        }

        async function sendConfirmationMail() {

            const data = {
                email: formData.email,
                lastname: formData.lastname
            }

            try {
                const url = `/api/v1/customer/confirmation`;
                const result = await axios.put(url, data);
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
            {loading ? <><LoadingIndicator /> {finishOrder()}</>
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