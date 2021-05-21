import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Button from "../../../UI/Button/Button";
import FormElement from "../../FormElement/FormElement";
import axios from "axios";
import {useHistory} from "react-router";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator";

function Step2({currentStep,shipmentData, shoppingCartItems, orderItems}) {

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [checkedTerms, toggleCheckedTerms] = useState(false);
    const [mode, setMode] = useState('init');
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        birthDate: '',
        phone: '',
        note: '',
        postalCode: '',
        addressType: '',
        shipmentCarrier: '',
        street: '',
        number: '',
        city: '',
        country: ''
    })

    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    let history = useHistory();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            async function checkAddress() {
                try {
                    const code = postalCode.replace(/\s/g, '');
                    let url = `http://geodata.nationaalgeoregister.nl/locatieserver/free?fq=postcode:${code}`;

                    const result = await axios.get(url);

                    if (result.data.response.numFound > 0) {
                        setCity(result.data.response.docs[0].woonplaatsnaam);
                        setStreet(result.data.response.docs[0].straatnaam);
                    }
                } catch  (e) {
                    console.error(e);
                    setError("Fout bij ophalen gegevens.");
                    toggleLoading(false);
                }
            }

            if(postalCode!=="")
                checkAddress();

        }, 750)
        return () => clearTimeout(delayDebounceFn)
    }, [postalCode])

    function OnFormSubmit(data, e) {
        e.preventDefault();

        data.street = street;
        data.postalCode = postalCode;
        data.city = city;

        setFormValues({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            note: data.note,
            birthDate: data.birthDate,
            phone: data.phone,
            addressType: data.addressType,
            shipmentCarrier: data.shipmentCarrier,
            postalCode: postalCode,
            street: street,
            number: data.number,
            city: city,
            country: data.country
        })

        history.push({
            pathname: `/winkelwagen/checkout/stappen/`,
            state: {
                orderItems: orderItems,
                shoppingCartItems: shoppingCartItems,
                shipmentData: data,
                step: 3
            }
        });
        window.location.reload();
    }

    function GetForm(shipmentData) {
        const {register, errors, handleSubmit} = useForm({
            criteriaMode: "all",
            mode: "onChange"
        });

        if(shipmentData !== undefined && mode==='init') {
            setFormValues({
                firstname: shipmentData.firstname,
                lastname: shipmentData.lastname,
                email: shipmentData.email,
                note: shipmentData.note,
                birthDate: shipmentData.birthDate,
                phone: shipmentData.phone,
                addressType: shipmentData.addressType,
                postalCode: shipmentData.postalCode,
                street: shipmentData.street,
                number: shipmentData.number,
                city: shipmentData.city,
                country: shipmentData.country
            })
            setMode('data');
        }

        return (
        <>
            <form onSubmit={handleSubmit(OnFormSubmit)}>
                <div className="userDetails">
                    <div className="firstColumn">
                        <div className="AddressForm">
                                <fieldset>
                                    <h2>Persoonsgegevens</h2>

                                    <div className="formElement">
                                        {errors.sex ? <span className='errorMessage'>{errors.sex.message}</span> : <span>&nbsp;</span>}
                                        <select name="sex" ref={register({ required: true })}>
                                            <option value="">Geslacht:</option>
                                            <option value="M">Man</option>
                                            <option value="F">Vrouw</option>
                                        </select>
                                    </div>

                                    <FormElement
                                        type="text"
                                        name="firstname"
                                        label="Voornaam"
                                        formValue={formValues.firstname}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            minLength: {
                                                value: 2,
                                                message: 'Je dient minimaal 2 tekens te gebruiken',
                                            },
                                        })}
                                        error={errors.firstname &&
                                        <span className='errorMessage'>{errors.firstname.message}</span>}
                                    /><br/>

                                    <FormElement
                                        type="text"
                                        name="lastname"
                                        label="Achternaam"
                                        formValue={formValues.lastname}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            minLength: {
                                                value: 2,
                                                message: 'Je dient minimaal 2 tekens te gebruiken',
                                            },
                                        })}
                                        error={errors.lastname && <span className='errorMessage'>{errors.lastname.message}</span>}
                                    /><br/>

                                    <FormElement
                                        type="text"
                                        name="email"
                                        label="E-mail"
                                        formValue={formValues.email}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Onjuist e-mail adres ingevoerd",
                                            }
                                        })}
                                        error={errors.email && <span className='errorMessage'>{errors.email.message}</span>}
                                    /> <br/>

                                    <FormElement
                                        type="text"
                                        name="birthDate"
                                        label="Geboortedatum"
                                        formValue={formValues.birthDate}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                                                message: "Onjuiste geboortedatum ingevoerd",
                                            }
                                        })}
                                        error={errors.birthDate &&
                                        <span className='errorMessage'>{errors.birthDate.message}</span>}
                                    /><br/>

                                    <FormElement
                                        type="text"
                                        name="phone"
                                        label="Telefoonnummer"
                                        formValue={formValues.phone}
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
                                        })}
                                        error={errors.phone &&
                                        <span className='errorMessage'>{errors.phone.message}</span>}
                                    /> <br/>
                                </fieldset>

                                <fieldset>
                                    <h2>Factuuradres</h2>
                                    <div className="formElementContainer">
                                        <div className="formElementInfo">
                                            {errors.postalCode &&
                                            <><span className='errorMessage'>{errors.postalCode.message}</span><br /></>}
                                            <div id="float-label">
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    // value={formValues.postalCode}
                                                    defaultValue={formValues.postalCode}
                                                    label="Postcode"
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                    ref={register({
                                                        required: "Verplicht veld",
                                                        pattern: {
                                                            value: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,
                                                            message: "Ongeldige postcode, controleer de input",
                                                        },
                                                    })}
                                                />
                                                <label className="Active" htmlFor="postalCode">
                                                    Postcode
                                                </label>
                                            </div>
                                        </div>
                                    </div><br />

                                    <FormElement
                                        type="text"
                                        name="street"
                                        label="Straat"
                                        formValue={formValues.street ? formValues.street : street}
                                    /> <br/>

                                    <FormElement
                                        type="text"
                                        name="city"
                                        label="Plaatsnaam"
                                        formValue={formValues.city ? formValues.city : city}
                                    /> <br/>

                                    <FormElement
                                        type="text"
                                        name="number"
                                        label="Huisnummer"
                                        formValue={formValues.number}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })}
                                        error={errors.number &&
                                        <span className='errorMessage'>{errors.number.message}</span>}
                                    /><br />

                                    <FormElement
                                        type="text"
                                        name="country"
                                        label="Land"
                                        formValue={formValues.country}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })}
                                        error={errors.number &&
                                        <span className='errorMessage'>{errors.number.message}</span>}
                                    />
                                    <div className="formElement">
                                        <h3>Dit adres is:</h3>
                                        {errors.shipmentCarrier && <p className='errorMessage'>{errors.shipmentCarrier.message}</p>}
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="P"
                                            ref={register({
                                                required: "Verplicht veld",
                                            })}
                                        /> Privé
                                        <br />
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="B"
                                            ref={register({
                                                required: "Verplicht veld",
                                            })}
                                        /> Zakelijk
                                    </div>
                                </fieldset>
                        </div>
                    </div>

                    <div className="secondColumn">
                        <div className="shipmentDetails">
                            <div className="formElement">
                                <h2>Verzendopties:</h2>
                                {errors.shipmentCarrier && <p className='errorMessage'>{errors.shipmentCarrier.message}</p>}
                                <input
                                    type="radio"
                                    name="shipmentCarrier"
                                    value="1"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Verzending via PostNL (gratis v.a. €24.95)
                                <br />
                                <input
                                    type="radio"
                                    name="shipmentCarrier"
                                    value="2"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Verzending via DPD (gratis v.a. €24.95)
                            </div>
                        </div>

                        <h3>Extra wensen</h3>
                        <div className="formElement">
                            {errors.note ? <span className='errorMessage'>{errors.note.message}</span> : <span>&nbsp;</span>}
                            <textarea
                                name="note"
                                placeholder="Als u de bestelling wilt laten bezorgen bij de buren of als u andere opmerkingen heeft"
                                defaultValue={formValues.note}
                            />
                        </div>

                        <div className="paymentDetails">
                            <div className="formElement">
                                <h2>Betaalopties:</h2>
                                <p>Op dit moment is het alleen mogelijk te betalen via overschrijving. *</p>
                            </div>
                        </div><br />

                        <small>(* u ontvangt per e-mail een factuur)</small>

                        <div className="conditions">
                            <h3>Privacy</h3>
                            <input
                                type="checkbox"
                                name="conditions"
                                id="conditions"
                                checked={checkedTerms}
                                onChange={() => toggleCheckedTerms(!checkedTerms)}
                                ref={register({
                                    required: 'Je dient akkoord te gaan met de privacy voorwaarden',
                                })}
                            />
                            <label htmlFor="conditions">Ik heb de <a href="/info/privacy" target="_blank">privacy voorwaarden</a> doorgelezen en ga akkoord</label><br /><br />
                        </div>
                    </div>
                </div>

                <Button
                    disabled={!checkedTerms}
                    usage="button"
                    value="Volgende stap"
                />
            </form>
            </>
        )
    }

    if(currentStep !== 2){
        return (null)
    }

    return(
        <>
            {error && <p>{error}</p>}
            {loading ? <LoadingIndicator /> : GetForm(shipmentData)}
        </>
    )
}

export default Step2;