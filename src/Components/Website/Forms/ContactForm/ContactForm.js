import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.css';
import Button from "../../UI/Button/Button";
import FormElement from "../FormElement/FormElement";

const ContactForm = () => {
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
        mode: "onChange"
    });

    function onFormSubmit(data) {
        //e.preventDefault();
        console.log(data);
    }

    return(

        <div className="ContactForm" >
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <legend>Contactformulier</legend>

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
                    />

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
                    />

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
                    />


                    {errors.message && <span className='error-message'>{errors.message.message}</span>}
                   <br />

                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        ref={register}
                    />
                    <br /><br />

                    <Button value="Verzenden" />
                </fieldset>
            </form>
        </div>
    )
}

export default ContactForm;