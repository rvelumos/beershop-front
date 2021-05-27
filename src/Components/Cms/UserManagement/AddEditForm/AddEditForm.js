import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { username } = useParams();
    const { token, isAddMode } = props;

    const [customerValues, setCustomerValues] = useState({
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        birthDate: '',
        phone: '',
        newsletter: '',
        sex: '',
        address : {
            street: '',
            streetAdd: '',
            number: '',
            postalCode: '',
            city: '',
            province: '',
            country: ''
        }
    });

    useEffect(() => {
        async function getCustomerData (){
            try {
                const url=`/api/v1/customer/${username}`
                const result = await axios.get(url);
                console.log(result);
                const {
                    id,
                    email,
                    firstname,
                    lastname,
                    birthDate,
                    phone,
                    newsletter,
                    sex
                } = result.data[0];

                const address = result.data[0].address;

                setCustomerValues({
                    id: id,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    birthDate: birthDate,
                    username: username,
                    phone: phone,
                    newsletter: newsletter,
                    sex: sex,
                    address: {
                        id: address.id,
                        street: address.street,
                        streetAdd: address.streetAdd,
                        number: address.number,
                        postalCode: address.postalCode,
                        city: address.city,
                        province: address.province,
                        country: address.country
                    }
                });

            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen klantgegevens.");
            }
            toggleLoading(false);
        }
        if(username !== undefined)
            getCustomerData();
    // eslint-disable-next-line
    },[])

    const changeHandler = e => {
        setCustomerValues({[e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {

        console.table(data);

        handleLogin({
            username: data.username,
            password: data.password,
            email: data.email,
        })

        handleRegistrationData({
            userId: data.userId,
            firstname: data.firstname,
            username: data.username,
            lastname: data.lastname,
            email: data.email,
            sex: data.sex,
            phone: data.phone,
            birthDate: data.birthDate,
        }, isAddMode)

        handleAddressData({
            addressId: data.addressId,
            street: data.street,
            streetAdd: data.streetAdd,
            postalCode: data.postalCode,
            city: data.city,
            number: data.number,
            province: data.province,
            country: data.country
        }, isAddMode)
    }

    async function handleLogin(userData) {
        setError(false);
        toggleLoading(true);

        let url = `/api/v1/create_user/`;

        try {
            const result = await axios.post(url, userData);

            if(result) {
                url = `/api/v1/create_authority/`;
                try {
                    if(isAddMode) {
                        const result = await axios.post(url, {
                            authority: "ROLE_CUSTOMER",
                            username: userData.username,
                            password: userData.password
                        })
                        if (result)
                            return("");
                    } else {
                        const result = await axios.put(url, {
                            authority: "ROLE_CUSTOMER",
                            username: userData.username,
                            password: userData.password
                        })
                        if (result)
                            return("");
                    }
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

    async function handleRegistrationData(customerData, isAddmode) {
        setError(false);
        toggleLoading(true);

        let url = `/api/v1/admin/customer/`;

        try {
            if(customerData.userId === null) {
                const result = await axios.post(url, customerData, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (result)
                    return("");
            } else {
                url = `${url}/${customerData.userId}`
                const result = await axios.put(url, customerData, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (result)
                    return("");
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken registratiegegevens.");
        }
        toggleLoading(false);
    }

    async function handleAddressData(addressData, isAddmode) {
        let url = `/api/v1/address/`;

        try {
            if(addressData.addressId === null) {
                const result = await axios.post(url, addressData, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (result)
                    return("");
            } else {
                url = `${url}/${addressData.addressId}`
                const result = await axios.put(url, addressData, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (result)
                    return("");
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij verwerken adresgegevens.");
        }
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
                        <h1>Gebruiker {customerValues.username !== undefined ? ` ${customerValues.username} wijzigen` : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <input type="hidden" name="addressId" value={customerValues.address.id} ref={register} />
                            <input type="hidden" name="userId" value={customerValues.id} ref={register} />
                            <fieldset>
                                <div className="formElement">
                                    <p>Geslacht</p>
                                    {errors.sex && <span className='errorMessage'>{errors.sex.message}</span>}
                                    <select name="sex" defaultValue={customerValues.sex} ref={register({ required: true })}>
                                        <option value="">Maak een keuze:</option>
                                        <option value="M">Man</option>
                                        <option value="F">Vrouw</option>
                                    </select>
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="firstname"
                                        label="Voornaam"
                                        formValue={customerValues.firstname}
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
                                        formValue={customerValues.lastname}
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
                                        formValue={customerValues.email}
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
                                        formValue={customerValues.birthDate}
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
                                        formValue={customerValues.phone}
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
                                    <p>Nieuwsbrief</p>
                                    {errors.newsletter && <span className='errorMessage'>{errors.newsletter.message}</span>}
                                    <select name="newsletter" ref={register({ required: true })}>
                                        <option value="">Maak een keuze:</option>
                                        <option value="true">Ja</option>
                                        <option value="false">Nee</option>
                                    </select>
                                </div>
                            </fieldset>

                            <h2>Adresgegevens</h2>
                            <fieldset>
                                    <div className="formElement">
                                            <FormElement
                                                type="text"
                                                name="postalCode"
                                                formValue={customerValues.address.postalCode}
                                                label="Postcode"
                                                onChange={changeHandler}
                                                fieldRef={register({
                                                    required: "Verplicht veld",
                                                    pattern: {
                                                        value: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,
                                                        message: "Ongeldige postcode, controleer de input",
                                                    },
                                                })}
                                            />
                                    </div>
                                <br />

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="street"
                                        label="Straat"
                                        formValue={customerValues.address.street}
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
                                        formValue={customerValues.address.streetAdd}
                                        onChange={changeHandler}
                                        fieldRef={register}
                                        error={errors.streetAdd ? <span className='errorMessage'>{errors.streetAdd.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="number"
                                        label="Huisnummer"
                                        formValue={customerValues.address.number}
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
                                        formValue={customerValues.address.city}
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
                                        formValue={customerValues.address.province}
                                        onChange={changeHandler}
                                        fieldRef={register}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="country"
                                        label="Land"
                                        formValue={customerValues.address.country}
                                        onChange={changeHandler}
                                        fieldRef={register}
                                    />
                                </div>
                            </fieldset>

                            <h2>Inloggegevens</h2>
                            <fieldset>
                                    <div className="formElement">
                                        <FormElement
                                            type="text"
                                            name="username"
                                            defaultValue={customerValues.username}
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
                                            defaultValue={customerValues.password}
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
                { submittedForm && <p className="notify">Gebruiker is opgeslagen</p> }
                { loading ? <LoadingIndicator /> : <UserItem /> }
                { error && <p>{error}</p>}
            </div>
        </>
    )
}
export default AddEditForm;