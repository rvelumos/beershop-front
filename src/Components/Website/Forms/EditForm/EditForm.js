import React, {useRef, useState} from 'react';
import './EditForm.css';
import FormElement from "../FormElement/FormElement";
import {useForm} from "react-hook-form";
import Button from "../../UI/Button/Button";
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import {useLocation} from "react-router-dom";
import Feedback from "../../UI/Feedback/Feedback";
import LeftMenu from "../../UserProfile/LeftMenu/LeftMenu";
import SmallLoadingIndicator from "../../UI/LoadingIndicator/SmallLoadingIndicator";

const EditForm = ({username}) => {

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [checked, toggleChecked] = useState(false);
    const [mode, setMode] = useState('init');

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthDate: '',
        password: '',
        id: '',
        passwordRepeat: '',
        address : {
            id: '',
            street: '',
            streetAdd: '',
            number: '',
            postalCode: '',
            city: '',
            province: '',
            country: ''
        }
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {

        console.table(data);

        if(error === false) {
            if(data.password !== "") {
                updateLogin({
                    password: data.password,
                    email: data.email
                })
            }

            updateRegistration({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                birthDate: data.birthDate
            })

            updateAddress({
                id: data.id,
                street: data.street,
                streetAdd: data.streetAdd,
                postalCode: data.postalCode,
                number: data.number,
                city: data.city,
                province: data.province,
                country: data.country
            })
        }
    }

    async function updateLogin(userData) {

        setError(false);
        toggleLoading(true);

        let url = `/api/v1/user/${username}`;

        try {
            const result = await axios.put(url, userData);
            console.log("User result: "+result);
            toggleLoading(false);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken logingegevens.");
            toggleLoading(false);
        }
    }

    async function updateRegistration(customerData) {
        setError(false);
        toggleLoading(true);
        const id = formValues.id;
        console.log("update");
        console.log(formValues);

        const url = `/api/v1/customer/${id}`;

        try {
            const result = await axios.put(url, customerData);
            if(result) {
                setMessage("Data succesvol opgeslagen")
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken registratiegegevens.");
        }
        toggleLoading(false);
    }

    async function updateAddress(addressData) {
        console.log("update address");
        console.log(addressData);

        const url = `/api/v1/address/${addressData.id}`;

        try {
            const result = await axios.put(url, addressData);
            if(result) {
                setMessage("Data succesvol opgeslagen")
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken registratiegegevens.");
        }
        toggleLoading(false);
    }

    function RegistrationFormItems () {
        const location = useLocation();

        if(mode === 'init' && location.state.formValue !== undefined) {
            setFormValues(location.state.formValue);
            setMode('data');
        }

        console.log(formValues);

        const { register, errors, watch, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });
        const password = useRef({});
        password.current = watch("password", "");

        return(
            <>
                <div className="Register">
                    <div className="formContainer" >
                        <div className="RegisterForm" >
                            <h1>Jouw informatie aanpassen</h1>
                            <form onSubmit={handleSubmit(onSubmitForm)}>

                                <fieldset>
                                    <input type="hidden" name="id" value={formValues.id} ref={register} />
                                    <div className="formElement">
                                        {errors.sex ? <span className='errorMessage'>{errors.sex.message}</span> : <span>&nbsp;</span>}
                                        <select name="sex" defaultValue={formValues.sex} ref={register({ required: true })}>
                                            <option value="">Geslacht:</option>
                                            <option value="M">Man</option>
                                            <option value="F">Vrouw</option>
                                        </select>
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="firstname"
                                            formValue={formValues.firstname}
                                            label="Voornaam"
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
                                            formValue={formValues.lastname}
                                            label="Achternaam"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.lastname ? <span className='errorMessage'>{errors.lastname.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="email"
                                            formValue={formValues.email}
                                            label="E-mailadres"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: "Verplicht veld",
                                                pattern:{
                                                    value: /^\S+@\S+$/i,
                                                    message: "Ongeldige e-mail"
                                                }
                                            })
                                            }
                                            error={errors.email ? <span className='errorMessage'>{errors.email.message}</span> : <span>&nbsp;</span>}
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
                                        <FormElement
                                            type="text"
                                            name="birthDate"
                                            label="Geboortedatum"
                                            formValue={formValues.birthDate}
                                            onChange={changeHandler}
                                            form="form"
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
                                    <div className="formElement" style={{"margin": "20px"}}>
                                            <input
                                                type="checkbox"
                                                name="newsletter"
                                                checked={checked}
                                                onChange={() => toggleChecked(!checked)}
                                            />
                                            <label htmlFor="newsletter">Nieuwsbrief</label><br /><br />
                                    </div>
                                </fieldset>

                                <h3>Adresgegevens</h3>
                                <fieldset>
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="postalCode"
                                            formValue={formValues.address.postalCode}
                                            label="Postcode"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: "Verplicht veld",
                                                pattern: {
                                                    value: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,
                                                    message: "Ongeldige postcode, controleer de input",
                                                },
                                            })}
                                            error={errors.postalCode ? <span className='errorMessage'>{errors.postalCode.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="street"
                                            label="Straat"
                                            formValue={formValues.address.street}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.street ? <span className='errorMessage'>{errors.street.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="streetAdd"
                                            label="Straat (toevoeging)"
                                            formValue={formValues.address.streetAdd}
                                            fieldRef={register}
                                            onChange={changeHandler}
                                            error={<span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="number"
                                            label="Huisnummer"
                                            formValue={formValues.number}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.number ? <span className='errorMessage'>{errors.number.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="city"
                                            label="Stad"
                                            formValue={formValues.address.city}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.city ? <span className='errorMessage'>{errors.city.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="province"
                                            label="Provincie"
                                            formValue={formValues.address.province}
                                            onChange={changeHandler}
                                            fieldRef={register}
                                            error={<span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="country"
                                            label="Land"
                                            fieldRef={register}
                                            formValue={formValues.address.country}
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </fieldset>

                                <h3>Inloggegevens</h3>
                                <fieldset>


                                    <div className="formElement">
                                        <FormElement
                                            type="password"
                                            name="password"
                                            formValue={formValues.password}
                                            label="Wachtwoord"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                minLength: {
                                                    value: 5,
                                                    message: "Geef tenminste 5 tekens op"
                                                },
                                            })}
                                            error={errors.password ? <span className='errorMessage'>{errors.password.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <span>&nbsp;</span>
                                        <FormElement
                                            type="password"
                                            name="passwordRepeat"
                                            formValue={formValues.passwordRepeat}
                                            label="Wachtwoord nogmaals"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </fieldset><br />


                                {message && <Feedback type="success" content={message} />}

                                <Button usage="button" value={loading ? <SmallLoadingIndicator /> : "Opslaan"} /><br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mainTop">
                <div className="mainContent">
                <LeftMenu />
                <div className="RegistrationOverview">
                    {loading && <LoadingIndicator /> }
                    {RegistrationFormItems()}
                    {error && <Feedback type="error" content={error} /> }
                </div>
                </div>
            </div>
        </>
    )
}

export default EditForm;