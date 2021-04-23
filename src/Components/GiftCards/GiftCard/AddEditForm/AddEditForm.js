import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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

    console.log("id "+id);

    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        amount: '',
        categoryId: '999',
        manufacturer_id: '999'
    });

    useEffect(() => {
            async function getFormData (){

                try {
                    const url=`http://localhost:8080/api/v1/product/${id}/`
                    const result = await axios.get(url, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                    const {name, description, price} = result.data;

                    setFormValues({
                        name: name,
                        description: description,
                        price: price,
                        manufacturer_id: '999',
                        categoryId: '999',
                    });
                    console.table(formValues);
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

        const { name, description, price} = data;

        setFormValues({
            name: name,
            description: description,
            price: price,
            category_id: 999,
            manufacturer_id: 999,
            stock: 9999,
            type: 4
        })

        setSubmittedForm(true);
    }

    const GiftCardItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        return(
            <>
                <div className="AddEditForm">
                        <div className="RegisterForm" >
                            <h1>Cadeaubon {id ? "wijzigen" : "toevoegen"}</h1>
                            <form onSubmit={handleSubmit(onSubmitForm)}>

                                <fieldset>
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="name"
                                            label="Naam"
                                            formValue={formValues.name}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.name ? <span className='error-message'>{errors.name.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="description"
                                            label="Omschrijving"
                                            formValue={formValues.description}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.description ? <span className='error-message'>{errors.description.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="price"
                                            label="Aanschafprijs"
                                            formValue={formValues.price}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: "Verplicht veld",
                                                pattern: {
                                                    value: /^[1-9]\d*(\.\d+)?$/,
                                                    message: 'Ongeldige invoer'
                                                }
                                            })
                                            }
                                            error={errors.price ? <span className='error-message'>{errors.price.message}</span> : <span>&nbsp;</span>}
                                        />
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
                { loading ? <LoadingIndicator /> : <GiftCardItem /> }
                { error && <Error type="message_container" content={error} /> }
                {/*{ submittedForm && <p className="notify">Bon is toegevoegd</p> }*/}
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="product" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
