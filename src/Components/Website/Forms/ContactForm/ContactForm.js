import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.css';
import Button from "../../UI/Button/Button";
import FormElement from "../FormElement/FormElement";
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";

const ContactForm = () => {

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, isSent] = useState(false);
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        message: ''
    })

    function onFormSubmit(data) {
        //e.preventDefault();
        console.log(data);

        setFormValues({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            message: data.message
        })

        sendEmail(data)
    }

    async function sendEmail (data) {

        try {
            const url = "/api/v1/contactform/"
            const result = await axios.post(url, data);
            if(result) {
                isSent(true);
            }

        } catch (e) {
            console.error(e);
            setError("Fout bij versturen e-mail.");
        }
        toggleLoading(false);
    }

    function GetForm () {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange"
        });

        return(
            <div className="ContactForm" >
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <fieldset>
                        <legend>Contactformulier</legend>

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
                            error={errors.firstname ? <span className='errorMessage'>{errors.firstname.message}</span> : <span>&nbsp;</span>}
                        />


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
                            error={errors.lastname ? <span className='errorMessage'>{errors.lastname.message}</span> : <span>&nbsp;</span>}
                        />

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
                            error={errors.email ? <span className='errorMessage'>{errors.email.message}</span> : <span>&nbsp;</span>}
                        />


                        {errors.message ? <span className='errorMessage'>{errors.message.message}</span> : <span>&nbsp;</span>}
                        <br />

                        <textarea
                            name="message"
                            id="message"
                            placeholder="Vul bericht in"
                            cols="30"
                            rows="10"
                            ref={register({
                                required: "Verplicht veld",
                            })}
                        />
                        <br /><br />

                        <Button usage="button" value="Verzenden" />
                    </fieldset>
                </form>
            </div>
        )
    }

    return(
        <>
            {error && <p>{error}</p>}
            {loading ? <LoadingIndicator /> :
                sent ?
                    <p className='notify'>Je bericht is succesvol verzonden</p>
                :
                    GetForm()}
        </>
    )
}

export default ContactForm;