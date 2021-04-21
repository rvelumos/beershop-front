import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";

import AddEdit from "../../Actions/AddEdit";

import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../../Website/UI/Feedback/Error/Error";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [formValues, setFormValues] = useState({
        user_id: '',
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        birth_date: '',
        phone: '',
        newsletter: '',
        sex: ''
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`http://localhost:8080/api/v1/customer/${id}/`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                const {
                    user_id,
                    email,
                    firstname,
                    lastname,
                    address,
                    birth_date,
                    phone,
                    newsletter,
                    sex,
                } = result.data;

                setFormValues({
                    user_id: user_id,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    birth_date: birth_date,
                    phone: phone,
                    address: address,
                    newsletter: newsletter,
                    sex: sex
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

        const {
            email,
            firstname,
            lastname,
            address,
            birth_date,
            phone,
            newsletter,
            sex

        } = data;

        setFormValues({
            email: email,
            firstname: firstname,
            lastname: lastname,
            address: address,
            birth_date: birth_date,
            phone: phone,
            newsletter: newsletter,
            sex: sex
        });

        setSubmittedForm(true);
    }

    const UserItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        return(
            <>
                <div className="AddEditForm">
                    <div className="RegisterForm" >
                        <h1>Klant {id ? " wijzigen" : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>

                            <fieldset>

                                <div className="formElement">
                                    {errors.sex ? <span className='error-message'>{errors.sex.message}</span> : <span>&nbsp;</span>}
                                    <select name="sex" ref={register({ required: true })}>
                                        <option value="">Geslacht:</option>
                                        <option value="M">Man</option>
                                        <option value="F">Vrouw</option>
                                    </select>
                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="firstname"
                                        label="Voornaam"
                                        formValue={formValues.firstname}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                        })}
                                        error={errors.firstname ? <span className='error-message'>{errors.firstname.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="lastname"
                                        label="Achternaam"
                                        formValue={formValues.lastname}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })
                                        }
                                        error={errors.lastname ? <span className='error-message'>{errors.lastname.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="address"
                                        label="Adresgegevens"
                                        formValue={formValues.address}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })
                                        }
                                        error={errors.address ? <span className='error-message'>{errors.address.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="birth_date"
                                        label="Geboortedatum"
                                        formValue={formValues.birth_date}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                message: 'Ongeldige geboortedatum'
                                            }
                                        })}
                                        error={errors.birth_date ? <span className='error-message'>{errors.birth_date.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="phone"
                                        label="Telefoon"
                                        formValue={formValues.phone}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            minLength: {
                                                value: 10,
                                                message: "voer minimaal 10 cijfers in"
                                            },
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Alleen cijfers toegestaan"
                                            }
                                        })
                                        }
                                        error={errors.phone ? <span className='error-message'>{errors.phone.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    {errors.newsletter ? <span className='error-message'>{errors.newsletter.message}</span> : <span>&nbsp;</span>}
                                    <select name="newsletter" ref={register({ required: true })}>
                                        <option value="">Inschrijven nieuwsbrief</option>
                                        <option value="true">Ja</option>
                                        <option value="false">Nee</option>
                                    </select>
                                </div>

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
                { loading ? <LoadingIndicator /> : <UserItem /> }
                { error && <Error type="message_container" content={error} /> }
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="product" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
