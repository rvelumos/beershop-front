import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
import AddEdit from "../../Cms/Actions/AddEdit";
import LoadingIndicator from "../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../Website/UI/Feedback/Error/Error";
import FormElement from "../../Website/Forms/FormElement/FormElement";
import Button from "../../Website/UI/Button/Button";
import './AddEditForm.css';
import axios from "axios";

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [sentForm, setSentForm] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;


    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        amount: '',
    });

    useEffect(() => {
        if(id) {
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
                    const {name, description, amount, discount_type} = result.data;
                    if (result.data.length > 0) {
                        setFormValues({
                            name: name,
                            description: description,
                            amount: amount,
                        });
                        toggleLoading(false);
                    }
                } catch (e) {
                    console.error(e);
                    setError("Fout bij ophalen gegevens.");
                    toggleLoading(false);
                }
            }
            getFormData();
        }
    },[])

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {
        console.table(data);

        if(error === false) {
            return (
                <AddEdit isAddMode={isAddMode} id={id} itemData={data}/>
            )
        }
    }

    const GiftCardItems = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        return(
            <>
                <div className="AddEditForm">
                        <div className="RegisterForm" >
                            <h1>Cadeaubon toevoegen</h1>
                            <form onSubmit={handleSubmit(onSubmitForm)}>

                                <fieldset>
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="name"
                                            label="Naam"
                                            value={formValues.name}
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
                                            value={formValues.description}
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
                                            name="amount"
                                            label="Hoogte bedrag"
                                            value={formValues.amount}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: "Verplicht veld",
                                            })
                                            }
                                            error={errors.amount ? <span className='error-message'>{errors.amount.message}</span> : <span>&nbsp;</span>}
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

    function showMessage () {
        return(
            <div>
                <h2>De data is succesvol opgeslagen!</h2>
                <p>Klik <Link to='/giftcards'>hier</Link> om verder te gaan.</p>
            </div>
        )
    }

    return (
        <>
            <div className="overview">
                {loading ? <LoadingIndicator /> : <GiftCardItems /> }
                {error && <Error type="message_container" content={error} /> }
            </div>
        </>
    )
}
