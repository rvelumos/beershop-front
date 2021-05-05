import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Button from "../../../UI/Button/Button";
import FormElement from "../../FormElement/FormElement";
import axios from "axios";
import {useHistory} from "react-router";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator";

function Step2({currentStep}) {

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [checkedTerms, toggleCheckedTerms] = useState(false);

    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    let history = useHistory();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            async function checkAddress() {
                toggleLoading(true);
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

        history.push({
            pathname: `/winkelwagen/checkout/stappen/`,
            state: {
                formData: data,
                step: 3
            }
        });
        window.location.reload();
    }

    function GetForm() {
        const {register, errors, handleSubmit} = useForm({
            criteriaMode: "all",
            mode: "onChange"
        });

        return (
        <>
            <form onSubmit={handleSubmit(OnFormSubmit)}>
                <div className="userDetails">
                    <div className="firstColumn">
                        <div className="AddressForm">
                                <fieldset>
                                    <h2>Factuuradres</h2>

                                    <FormElement
                                        type="text"
                                        name="firstname"
                                        label="Voornaam"
                                        value="firstname"
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
                                        value="lastname"
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
                                        value="email"
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
                                        value="birthDate"
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
                                        value="phone"
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

                                    <div className="formElementContainer">
                                        <div className="formElementInfo">
                                            {errors.postalcode &&
                                            <><span className='errorMessage'>{errors.postalcode.message}</span><br /></>}
                                            <div id="float-label">
                                                <input
                                                    type="text"
                                                    name="postalcode"
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
                                                <label className="Active" htmlFor="postalcode">
                                                    Postcode
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <FormElement
                                        type="text"
                                        name="street"
                                        label="Straat"
                                        formValue={street}
                                        disabled="disabled"
                                    /> <br/>

                                    <FormElement
                                        type="text"
                                        name="city"
                                        label="Plaatsnaam"
                                        formValue={city}
                                        disabled="disabled"
                                    /> <br/>

                                    <FormElement
                                        type="text"
                                        name="number"
                                        label="Huisnummer"
                                        value="number"
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })}
                                        error={errors.number &&
                                        <span className='errorMessage'>{errors.number.message}</span>}
                                    /> <br/><br/><br/>
                                </fieldset>
                        </div>
                    </div>

                    <div className="secondColumn">
                        <div className="shipmentDetails">
                            <div className="formElement">
                                <h2>Verzendopties:</h2>
                                {errors.sendOptions && <p className='errorMessage'>{errors.sendOptions.message}</p>}
                                <input
                                    type="radio"
                                    name="sendOptions"
                                    value="1"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Verzending via PostNL (gratis v.a. €24.95)
                                <br />
                                <input
                                    type="radio"
                                    name="sendOptions"
                                    value="2"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Ophalen (gratis)
                            </div>
                        </div>

                        <div className="paymentDetails">
                            <div className="formElement">
                                <h2>Betaalopties:</h2>
                                {errors.paymentOptions && <p className='errorMessage'>{errors.paymentOptions.message}</p>}
                                <input
                                    type="radio"
                                    name="paymentOptions"
                                    value="1"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Betaling via overschijving
                                <br />
                                <input
                                    type="radio"
                                    name="paymentOptions"
                                    value="2"
                                    ref={register({
                                        required: "Verplicht veld",
                                    })}
                                /> Betaling achteraf
                            </div>
                        </div>

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
            {loading ? <LoadingIndicator /> : GetForm()}
        </>
    )
}

export default Step2;