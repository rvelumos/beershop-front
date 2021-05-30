import React, {useRef, useState} from 'react';
import './RegistrationForm.css';
import FormElement from "../FormElement/FormElement";
import {useForm} from "react-hook-form";
import Button from "../../UI/Button/Button";
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import {Link} from "react-router-dom";
import Feedback from "../../UI/Feedback/Feedback";

const RegistrationForm = ({mode}) => {

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [sentForm, setSentForm] = useState(false);

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        sex: '',
        phone: '',
        birthDate: '',
        username: '',
        company: '',
        password: '',
        passwordRepeat: '',
        street: '',
        streetAdd: '',
        addressType: '',
        number: '',
        postalCode: '',
        city: '',
        province: '',
        country: ''
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
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
                sex: data.sex,
                firstname: data.firstname,
                username: data.username,
                lastname: data.lastname,
                company: data.company,
                email: data.email,
                phone: data.phone,
                birthDate: data.birthDate,
            })

            createAddress({
                street: data.street,
                streetAdd: data.streetAdd,
                addressType: data.addressType,
                postalCode: data.postalCode,
                number: data.number,
                city: data.city,
                province: data.province,
                country: data.country,
                username: data.username
            })
        }
    }

    async function createLogin(userData) {

        setError(false);
        toggleLoading(true);

        let url = `/api/v1/create_user/`;

        try {
            const result = await axios.post(url, userData);
            console.log("User result: "+result);

            if(result) {
                url = `/api/v1/create_authority/`;
                try {
                    const result = await axios.post(url, {
                        authority: "ROLE_CUSTOMER",
                        username: userData.username
                    })
                    if(!result)
                        setError("Fout bij opslaan authority");
                } catch (e) {
                    console.error(e);
                    setError("Fout bij verwerken logingegevens.");
                }
            }
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

        const url = `/api/v1/customer/`;

        try {
            const result = await axios.post(url, customerData);
            if(!result)
                setError("Fout bij opslaan registratie");
            else
                sendAccountConfirmationMail(customerData);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken registratiegegevens.");
        }
        toggleLoading(false);
    }

    async function sendAccountConfirmationMail(customerData) {
        const data = {
            email: customerData.email,
            firstname: customerData.firstname,
            lastname: customerData.lastname
        }

        try {
            const url = `/api/v1/customer/account_confirmation`;
            const result = await axios.post(url, data);
            if(result) {
                localStorage.removeItem('shopping_carts');
                toggleLoading(false);
            }

        } catch (e) {
            console.error(e);
            setError("Fout bij verzenden emailbevestiging.");
        }
    }

    async function createAddress(addressData) {
        const url = `/api/v1/address`;
console.log(addressData);
        try {
            const result = await axios.post(url, addressData);
            if(result)
                setSentForm(true);
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken adresgegevens.");
        }
        toggleLoading(false);
    }

    const RegistrationFormItems = () => {
        const [checkedTerms, toggleCheckedTerms] = useState(false);
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
                            <h1>Registreren</h1>
                            <form onSubmit={handleSubmit(onSubmitForm)}>

                                <h3>Account informatie</h3>
                                <fieldset>
                                    <div className="formElement">
                                        {errors.sex ? <span className='errorMessage'>{errors.sex.message}</span> : <span>&nbsp;</span>}
                                        <select name="sex" defaultValue={formValues.sex} ref={register({ required: 'Verplicht veld' })}>
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
                                            name="company"
                                            formValue={formValues.company}
                                            label="Bedrijf (optioneel)"
                                            onChange={changeHandler}
                                            fieldRef={register}
                                            error={<span>&nbsp;</span>}
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
                                </fieldset>

                                <h3>Adresgegevens</h3>
                                <fieldset>

                                    <div className="formElement">
                                        {errors.addressType ? <span className='errorMessage'>{errors.addressType.message}</span> : <span>&nbsp;</span>}
                                        <select name="addressType" defaultValue={formValues.addressType} ref={register({ required: 'Verplicht veld' })}>
                                            <option value="">Adres type:</option>
                                            <option value="B">Zakelijk</option>
                                            <option value="P">Privé</option>
                                        </select>
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="postalCode"
                                            formValue={formValues.postalCode}
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
                                            formValue={formValues.street}
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
                                            formValue={formValues.streetAdd}
                                            onChange={changeHandler}
                                            fieldRef={register}
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
                                            formValue={formValues.city}
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
                                            formValue={formValues.province}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.province ? <span className='errorMessage'>{errors.province.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="country"
                                            label="Land"
                                            formValue={formValues.country}
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                            })}
                                            error={errors.country ? <span className='errorMessage'>{errors.country.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>
                                </fieldset>

                                <h3>Inloggegevens</h3>
                                <fieldset>

                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="username"
                                            formValue={formValues.username}
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

                                    <div style={{width: "100%"}}>&nbsp;</div>

                                    <div className="formElement">
                                        <FormElement
                                            type="password"
                                            name="password"
                                            formValue={formValues.password}
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

                                    <div className="formElement">
                                        <FormElement
                                            type="password"
                                            name="passwordRepeat"
                                            formValue={formValues.passwordRepeat}
                                            label="Wachtwoord nogmaals"
                                            onChange={changeHandler}
                                            fieldRef={register({
                                                required: 'Verplicht veld',
                                                validate: value =>
                                                    value === password.current || "Wachtwoorden komen niet overeen"
                                            })}
                                            error = {errors.passwordRepeat ? <span className='errorMessage'>{errors.passwordRepeat.message}</span> : <span>&nbsp;</span>}
                                        />
                                    </div>
                                </fieldset><br />
                                {errors.conditions && <p className='errorMessage'>{errors.conditions.message}</p>}

                                <input
                                    type="checkbox"
                                    name="conditions"
                                    id="conditions"
                                    checked={checkedTerms}
                                    onChange={() => toggleCheckedTerms(!checkedTerms)}
                                    ref={register({
                                        required: 'Je dient akkoord te gaan met de voorwaarden',
                                    })}
                                />

                                <label htmlFor="conditions">Ik heb de <a href="/info/voorwaarden" target="_blank">voorwaarden</a> doorgelezen en ga akkoord</label><br /><br />

                                <Button
                                    disabled={!checkedTerms}
                                    usage="button"
                                    value="Versturen "
                                /><br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function confirmRegistration () {
        return(
            <div>
                <h2>Je bent succesvol geregistreerd!</h2>
                <p>Klik <Link to='/mijn_account'>hier</Link> om verder te gaan.</p>
            </div>
        )
    }

    return (
        <>
            <div className="RegistrationOverview">
                {loading ? <LoadingIndicator /> : null }
                {sentForm ? confirmRegistration() :
                    <RegistrationFormItems /> }
                {error && <Feedback type="error" content={error} /> }
            </div>
        </>
    )
}

export default RegistrationForm;