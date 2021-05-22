import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import AddEdit from "../../../Cms/Actions/AddEdit";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';
import axios from "axios";
import Feedback from "../../../Website/UI/Feedback/Feedback";

export function AddEditForm(props) {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [saved, setSaved] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [formValues, setFormValues] = useState({
        customerId: '',
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
                    orderDate,
                    orderSent,
                    priceTotal,
                    orderStatus,
                    invoiceStatus,
                } = result.data;

                setFormValues({
                    customerId: customerId,
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
        if(!isAddMode) {
            if(orderDate !== null) orderDate = orderDate.split('.')[0].replace("T", " ");
        }

        return(
            <>
                <div className="AddEditForm">
                    <div className="RegisterForm" >
                        <h1>Order {id ? `#${id} wijzigen` : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <fieldset>
                                {!isAddMode &&
                                    <>
                                        <div className="formElement">
                                            <p>Besteldatum: {orderDate}</p>
                                        </div>
                                    </>
                                }

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
                                        error={errors.customerId ? <span className='errorMessage'>{errors.customerId.message}</span> : <span>&nbsp;</span>}
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

                                        error={errors.orderSent ? <span className='errorMessage'>{errors.orderSent.message}</span> : <span>&nbsp;</span>}
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

                                            error={errors.orderDate ? <span className='errorMessage'>{errors.orderDate.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.priceTotal ? <span className='errorMessage'>{errors.priceTotal.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                        {errors.orderStatus ? <span className='errorMessage'>{errors.orderStatus.message}</span> : <span>&nbsp;</span>}
                                        <select name="orderStatus" defaultValue={formValues.orderStatus} ref={register({ required: true })}>
                                            <option value="">Order status &laquo; selecteer optie &raquo; </option>
                                            <option value="NEW_ADDED">Nieuw</option>
                                            <option value="PROCESSING">In behandeling</option>
                                            <option value="SENT">Verzonden</option>
                                            <option value="RECEIVED">Ontvangen</option>
                                            <option value="CANCELLED">Geannuleerd</option>
                                        </select>
                                </div>

                                <div className="formElement">
                                    {errors.invoiceStatus ? <span className='errorMessage'>{errors.invoiceStatus.message}</span> : <span>&nbsp;</span>}
                                    <select name="invoiceStatus" defaultValue={formValues.invoiceStatus} ref={register({ required: true })}>
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
                { error ? <Feedback type="error" content={error} /> : null }
                { submittedForm &&
                    <AddEdit
                        isAddMode={isAddMode}
                        token={token}
                        section="order"
                        id={id}
                        itemData={formValues}
                        saved={saved}
                        setSaved={setSaved}
                    /> }
            </div>
        </>
    )
}
