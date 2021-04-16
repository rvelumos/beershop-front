import React from 'react';
import { useForm } from 'react-hook-form';
import Button from "../../UI/Button/Button";
import FormElement from "../FormElement/FormElement";

const Step2 = () => {
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
        mode: "onChange"
    });

    function onFormSubmit(data) {
        //e.preventDefault();
        console.log(data);
    }

    return(

        <div className="AddressForm" >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <h1>Factuuradres</h1>

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
                        error={errors.firstname && <span className='error-message'>{errors.firstname.message}</span>}
                    /><br />

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
                        error={errors.lastname && <span className='error-message'>{errors.lastname.message}</span>}
                    /><br />

                    <FormElement
                        type="text"
                        name="email"
                        label="E-mail"
                        value="email"
                        fieldRef={register({
                            required: "Verplicht veld",
                            pattern: {
                                value: /S+@S+.S+/,
                                message: "Onjuist e-mail adres ingevoerd",
                            }
                        })}
                        error={errors.email && <span className='error-message'>{errors.email.message}</span>}
                    /> <br />

                    <FormElement
                        type="text"
                        name="birth_date"
                        label="Geboortedatum"
                        value="birth_date"
                        fieldRef={register({
                            required: "Verplicht veld",
                            pattern: {
                                value: /S+@S+.S+/,
                                message: "Onjuiste geboortedatum ingevoerd",
                            }
                        })}
                        error={errors.birth_date && <span className='error-message'>{errors.birth_date.message}</span>}
                    /><br/>

                    <FormElement
                        type="text"
                        name="phone"
                        label="Telefoonnummer"
                        value="phone"
                        fieldRef={register({
                            required: "Verplicht veld",
                            max: {
                                value: 10,
                                message: "Onjuiste geboortedatum ingevoerd",
                            }
                        })}
                        error={errors.birth_date && <span className='error-message'>{errors.birth_date.message}</span>}
                    /> <br />

                    <FormElement
                        type="text"
                        name="postalcode"
                        label="Postcode"
                        value="postalcode"
                        fieldRef={register({
                            required: "Verplicht veld",
                            pattern: {
                                value:  /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,
                                message: "Ongeldige postcode, controleer de input",
                            },
                        })}
                        error={errors.postalcode && <span className='error-message'>{errors.postalcode.message}</span>}
                    />

                    <FormElement
                        type="text"
                        name="number"
                        label="Nummer"
                        value="number"
                        fieldRef={register({
                            required: "Verplicht veld",
                        })}
                        error={errors.number && <span className='error-message'>{errors.number.message}</span>}
                    />

                    {/*<AddressLookUp postalcode={postalCode} number={number}/>*/}

                    <br /><br />

                    <Button value="Volgende stap" />
                </fieldset>
            </form>
        </div>
    )
}

export default Step2;