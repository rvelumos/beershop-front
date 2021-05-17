import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";

//import AddEdit from "../../Actions/AddEdit";

import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { username } = useParams();
    const { token } = props;

    const [formValues, setFormValues] = useState({
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        birthDate: '',
        phone: '',
        newsletter: '',
        sex: ''
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`/api/v1/customer/${username}`
                const result = await axios.get(url);
                const {
                    userId,
                    email,
                    firstname,
                    lastname,
                    address,
                    birthDate,
                    phone,
                    newsletter,
                    sex,
                } = result.data[0];

                setFormValues({
                    userId: userId,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    birthDate: birthDate,
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
        if(username !== undefined)
            getFormData();
    // eslint-disable-next-line
    },[])

    const changeHandler = e => {
        setFormValues({[e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {

        console.table(data);
        if(error === false) {
            createLogin({
                username: data.username,
                password: data.password,
                email: data.email,
            })

            createRegistration({
                firstname: data.firstname,
                username: data.username,
                lastname: data.lastname,
                email: data.email,
                sex: data.sex,
                phone: data.phone,
                birthDate: data.birthDate,
            })
        }
    }

    async function createLogin(userData) {
        setError(false);
        toggleLoading(true);

        let url = `/api/v1/create_user/`;

        try {
            const result = await axios.post(url, userData);

            if(result) {
                url = `/api/v1/create_authority/`;
                try {
                    const result = await axios.post(url, {
                        authority: "ROLE_CUSTOMER",
                        username: userData.username
                    })
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken logingegevens.");
                }
            }
            setSubmittedForm(true);
            toggleLoading(false);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken logingegevens.");
            toggleLoading(false);
        }
    }

    async function createRegistration(customerData) {
        setError(false);
        toggleLoading(true);

        let url = `/api/v1/admin/customer/`;

        try {
            const result = await axios.post(url, customerData, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if(result)
                console.log(result);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken registratiegegevens.");
        }
        toggleLoading(false);
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
                        <h1>Klant {username ? " wijzigen" : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <fieldset>
                                <div className="formElement">
                                    {errors.sex ? <span className='errorMessage'>{errors.sex.message}</span> : <span>&nbsp;</span>}
                                    <select name="sex" ref={register({ required: true })}>
                                        <option value="">Geslacht:</option>
                                        <option value="M">Man</option>
                                        <option value="F">Vrouw</option>
                                    </select>
                                </div>

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
                                        error={errors.firstname ? <span className='errorMessage'>{errors.firstname.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.lastname ? <span className='errorMessage'>{errors.lastname.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="email"
                                        defaultValue={formValues.email}
                                        label="E-mailadres"
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: /^\S+@\S+$/i
                                        })
                                        }
                                        error={errors.email ? <span className='errorMessage'>{errors.email.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="birthDate"
                                        label="Geboortedatum"
                                        formValue={formValues.birthDate}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                message: 'Ongeldige geboortedatum'
                                            }
                                        })}
                                        error={errors.birthDate ? <span className='errorMessage'>{errors.birthDate.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.phone ? <span className='errorMessage'>{errors.phone.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    {errors.newsletter ? <span className='errorMessage'>{errors.newsletter.message}</span> : <span>&nbsp;</span>}
                                    <select name="newsletter" ref={register({ required: true })}>
                                        <option value="">Inschrijven nieuwsbrief</option>
                                        <option value="true">Ja</option>
                                        <option value="false">Nee</option>
                                    </select>
                                </div>
                            </fieldset>

                            <h2>Inloggegevens</h2>
                            <fieldset>
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="username"
                                            defaultValue={formValues.username}
                                            label="Gebruikersnaam"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                                minLength: {
                                                    value: 5,
                                                    message: "Geef tenminste 5 tekens op"
                                                }
                                            })}
                                            error={errors.username ? <span className='errorMessage'>{errors.username.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="password"
                                            name="password"
                                            defaultValue={formValues.password}
                                            label="Wachtwoord"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                                minLength: {
                                                    value: 5,
                                                    message: "Geef tenminste 5 tekens op"
                                                },
                                            })}
                                            error={errors.password ? <span className='errorMessage'>{errors.password.message}</span> : <span>&nbsp;</span>}
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
                { submittedForm && <p className="notify">Gebruiker is toegevoegd</p> }
                { loading ? <LoadingIndicator /> : <UserItem /> }
                { error && <p>{error}</p>}
            </div>
        </>
    )
}
export default AddEditForm;