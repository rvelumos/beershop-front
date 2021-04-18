import React, {useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import FormElement from "../../Website/Forms/FormElement/FormElement";
import {useParams} from "react-router-dom";
import SmallLoadingIndicator from "../../Website/UI/LoadingIndicator/SmallLoadingIndicator";

const OrderAddEdit = ({mode}) => {

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    const [formValues, setFormValues] = useState({
        customer_id: '',
        shipping_id: '',
        order_sent: '',
        order_status: '',
        order_date: '',
        price_total: '',
        invoice_status: ''
    });

    const { id } = useParams();
    const isAddMode = !id;

    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
        mode: "onChange",
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function onSubmit(data) {
        return(
            handleOrder(data)
        )
    }

    async function handleOrder(data) {
        let url = `http://localhost:8080/api/v1/order/`;
        if(!isAddMode)
            url = `${url}/${id}`;

        console.log(url);

        try {
            const result = await axios.post(url, {data});
            console.log(result);
        } catch (e) {
            console.error(e);
            setError("Fout bij toevoegen gegevens.");
        }
        toggleLoading(false);
    }


    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isAddMode ? 'Order toevoegen' : `Order ${id} wijzigen`}</h1>
            <fieldset>
                <div className="formElement">
                    <FormElement
                        type="text"
                        name="customer_id"
                        label="Klant ID"
                        onChange={changeHandler}
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.customer_id ? <span className='error-message'>{errors.customer_id.message}</span> : <span>&nbsp;</span>}
                    />
                </div>
                <div className="formElement">
                    <FormElement
                        type="text"
                        name="shipment_id"
                        label="Verzending ID"
                        onChange={changeHandler}
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.shipment_id ? <span className='error-message'>{errors.shipment_id.message}</span> : <span>&nbsp;</span>}
                    />
                </div>

                <div className="formElement">
                    <FormElement
                        type="text"
                        name="order_date"
                        label="Order datum"
                        onChange={changeHandler}
                        fieldRef={register({
                            required: "Verplicht veld"
                        })
                        }
                        error={errors.order_date ? <span className='error-message'>{errors.order_date.message}</span> : <span>&nbsp;</span>}
                    />
                </div>

                <div className="formElement">
                    <FormElement
                        type="text"
                        name="order_sent"
                        label="Order verzenddatum"
                        onChange={changeHandler}
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.order_sent ? <span className='error-message'>{errors.order_sent.message}</span> : <span>&nbsp;</span>}
                    />
                </div>

                <div className="formElement">
                    <FormElement
                        type="text"
                        name="price_total"
                        label="Totaalprijs"
                        onChange={changeHandler}
                        form="form"
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.price_total ? <span className='error-message'>{errors.price_total.message}</span> : <span>&nbsp;</span>}
                    />
                </div>

                <div className="formElement">
                    <select
                        name="order_status"
                        label="Order status"
                        onChange={changeHandler}
                        form="form"
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.order_status ? <span className='error-message'>{errors.order_status.message}</span> : <span>&nbsp;</span>}
                    >
                        <option value="NEW_ADDED">Nieuw</option>
                        <option value="PROCESSING">In proces</option>
                        <option value="SENT">Verzonden</option>
                        <option value="RECEIVED">Ontvangen</option>
                        <option value="CANCELLED">Geannuleerd</option>
                    </select>
                </div>
                <div className="formElement">
                    <select
                        name="invoice_status"
                        label="Factuur status"
                        onChange={changeHandler}
                        form="form"
                        fieldRef={register({
                            required: 'Verplicht veld',
                        })}
                        error={errors.invoice_status ? <span className='error-message'>{errors.invoice_status.message}</span> : <span>&nbsp;</span>}
                    >
                        <option value="PAID">Betaald</option>
                        <option value="UNPAID">Niet betaald</option>
                    </select>
                </div>

                </fieldset>

                <button type="submit" className="btn btn-primary">
                    {loading && <SmallLoadingIndicator />}
                    Save
                </button>
        </form>
     </>
    )
}

export default OrderAddEdit;