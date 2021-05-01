import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import AddEdit from "../../../Cms/Actions/AddEdit";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../../Website/UI/Feedback/Error/Error";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';
import axios from "axios";

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [formValues, setFormValues] = useState({
        customerId: '',
        shippingId: '',
        orderDate: '',
        orderSent: '',
        priceTotal: '',
        orderStatus: '',
        invoiceStatus: ''
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`/api/v1/order/${id}/`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                const {customerId,
                    shippingId,
                    orderDate,
                    orderSent,
                    priceTotal,
                    orderStatus,
                    invoiceStatus,
                } = result.data;

                setFormValues({
                    customerId: customerId,
                    shippingId: shippingId,
                    orderDate: orderDate,
                    orderSent: orderSent,
                    priceTotal: priceTotal,
                    orderStatus: orderStatus,
                    invoiceStatus: invoiceStatus
                });

            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }
        if(id !== undefined)
            getFormData();
    // eslint-disable-next-line
    },[])

    const changeHandler = e => {
        setFormValues({[e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {
        console.table(data);

        let { customerId,
            shippingId,
            orderSent,
            orderDate,
            priceTotal,
            orderStatus,
            invoiceStatus
        } = data;

        if(isAddMode) {
            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth()+1;
            const yyyy = today.getFullYear();

            orderDate =  dd+'-'+mm+'-'+yyyy;
        }

        setFormValues({
            customerId: customerId,
            shippingId: shippingId,
            orderDate: orderDate,
            orderSent: orderSent,
            priceTotal: priceTotal,
            orderStatus: orderStatus,
            invoiceStatus: invoiceStatus,
        });

        setSubmittedForm(true);
    }

    const OrderItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        let orderDate = formValues.orderDate;
        let orderSent = formValues.orderSent;
        if(!isAddMode) {
            if(orderDate !== null) orderDate = orderDate.split('T')[0];
            if (orderSent !== null) orderSent = orderSent.split('T')[0];
        }

        return(
            <>
                <div className="AddEditForm">
                    <div className="RegisterForm" >
                        <h1>Order {id ? "wijzigen" : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <fieldset>
                                {!isAddMode &&
                                    <>
                                        <div className="formElement">
                                            <p>{formValues.customerId}</p>
                                        </div>

                                        <div className="formElement">
                                            <p>Besteldatum: {orderDate}</p>
                                        </div>
                                    </>
                                }

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="shippingId"
                                        label="Zendingsnummer"
                                        formValue={formValues.shippingId}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })}
                                        error={errors.shippingId ? <span className='error-message'>{errors.shippingId.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="customerId"
                                        label="Klant ID"
                                        formValue={formValues.customerId}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })}
                                        error={errors.customerId ? <span className='error-message'>{errors.customerId.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="orderSent"
                                        label="Verzenddatum"
                                        formValue={formValues.orderSent}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                message: 'Ongeldige datum'
                                            }
                                        })}

                                        error={errors.orderSent ? <span className='error-message'>{errors.orderSent.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                {!isAddMode &&
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="orderDate"
                                            label="Order besteldatum"
                                            formValue={formValues.orderDate}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                                pattern: {
                                                    value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                    message: 'Ongeldige datum'
                                                }
                                            })}

                                            error={errors.orderDate ? <span className='error-message'>{errors.orderDate.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>
                                }

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="priceTotal"
                                        label="Totaalprijs"
                                        formValue={formValues.priceTotal}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[1-9]\d*(\.\d+)?$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.priceTotal ? <span className='error-message'>{errors.priceTotal.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                        {errors.orderStatus ? <span className='error-message'>{errors.orderStatus.message}</span> : <span>&nbsp;</span>}
                                        <select name="orderStatus" ref={register({ required: true })}>
                                            <option value="">Order status &laquo; selecteer optie &raquo; </option>
                                            <option value="NEW_ADDED">Nieuw</option>
                                            <option value="PROCESSING">In behandeling</option>
                                            <option value="SENT">Verzonden</option>
                                            <option value="RECEIVED">Ontvangen</option>
                                            <option value="CANCELLED">Geannuleerd</option>
                                        </select>
                                </div>

                                <div className="formElement">
                                    {errors.invoiceStatus ? <span className='error-message'>{errors.invoiceStatus.message}</span> : <span>&nbsp;</span>}
                                    <select name="invoiceStatus" ref={register({ required: true })}>
                                        <option value="">Factuurstatus &laquo; selecteer optie &raquo; </option>
                                        <option value="PAID">Betaald</option>
                                        <option value="UNPAID">Niet betaald</option>
                                    </select>
                                </div>
                            </fieldset>

                            <Button
                                usage="button"
                                value="Versturen "
                            /><br /><br />
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="overview">
                { loading ? <LoadingIndicator /> : <OrderItem /> }
                { error ? <Error type="messageContainer" content={error} /> : null }
                { submittedForm && <AddEdit isAddMode={isAddMode} token={token} section="order" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
