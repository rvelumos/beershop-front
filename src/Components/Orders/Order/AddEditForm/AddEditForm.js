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
        customer_id: '',
        shipping_id: '',
        order_date: '',
        order_sent: '',
        price_total: '',
        order_status: '',
        invoice_status: ''
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`http://localhost:8080/api/v1/order/${id}/`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                const {customer_id,
                    shipping_id,
                    order_date,
                    order_sent,
                    price_total,
                    order_status,
                    invoice_status,
                } = result.data;

                setFormValues({
                    customer_id: customer_id,
                    shipping_id: shipping_id,
                    order_date: order_date,
                    order_sent: order_sent,
                    price_total: price_total,
                    order_status: order_status,
                    invoice_status: invoice_status
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
        console.table(formValues);

        const { customer_id,
            shipping_id,
            order_date,
            order_sent,
            price_total,
            order_status,
            invoice_status
        } = data;

        setFormValues({
            customer_id: customer_id,
            shipping_id: shipping_id,
            order_date: order_date,
            order_sent: order_sent,
            price_total: price_total,
            order_status: order_status,
            invoice_status: invoice_status,
        });

        setSubmittedForm(true);
    }

    const OrderItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        let order_date = formValues.order_date;
        let order_sent = formValues.order_sent;
        order_date = order_date.split('T')[0];
        if(order_sent !== null)order_sent = order_sent.split('T')[0];

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
                                            <p>{formValues.customer_id}</p>
                                        </div>

                                        <div className="formElement">
                                            <p>Besteldatum: {order_date}</p>
                                        </div>
                                    </>
                                }

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="shipping_id"
                                        label="Zendingsnummer"
                                        formValue={formValues.shipping_id}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })}
                                        error={errors.shipping_id ? <span className='error-message'>{errors.shipping_id.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="customer_id"
                                        label="Klant ID"
                                        formValue={formValues.customer_id}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })}
                                        error={errors.customer_id ? <span className='error-message'>{errors.customer_id.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="order_sent"
                                        label="Verzenddatum"
                                        formValue={formValues.order_sent}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                message: 'Ongeldige datum'
                                            }
                                        })}

                                        error={errors.order_sent ? <span className='error-message'>{errors.order_sent.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="price_total"
                                        label="Totaalprijs"
                                        formValue={formValues.price_total}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[1-9]\d*(\.\d+)?$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.price_total ? <span className='error-message'>{errors.price_total.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                        {errors.order_status ? <span className='error-message'>{errors.order_status.message}</span> : <span>&nbsp;</span>}
                                        <select name="order_status" ref={register({ required: true })}>
                                            <option value="">Order status &laquo; selecteer optie &raquo; </option>
                                            <option value="NEW_ADDED">Nieuw</option>
                                            <option value="PROCESSING">In behandeling</option>
                                            <option value="SENT">Verzonden</option>
                                            <option value="RECEIVED">Ontvangen</option>
                                            <option value="CANCELLED">Geannuleerd</option>
                                        </select>
                                </div>

                                <div className="formElement">
                                    {errors.invoice_status ? <span className='error-message'>{errors.invoice_status.message}</span> : <span>&nbsp;</span>}
                                    <select name="invoice_status" ref={register({ required: true })}>
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
                { error && <Error type="message_container" content={error} /> }
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="orders" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
