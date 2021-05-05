import React, {useState} from 'react';
import FormElement from "../Forms/FormElement/FormElement";
import './Newsletter.css';
import Button from "../UI/Button/Button";
import SmallLoadingIndicator from "../UI/LoadingIndicator/SmallLoadingIndicator";
import axios from "axios";
import {useForm} from "react-hook-form";

const Newsletter = () => {

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [mode, setMode] = useState('init');
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
        mode: "onChange",
    });

    function onSubmitForm (data) {

        const email = data.email;

        SaveEmail(email);
    }

    function SaveEmail(email) {
        if(mode==="init") {
            setMode("insert");
            async function addMailAddress() {

                setError(false);
                toggleLoading(true);


                const data = {
                    email: email
                }

                let url = `http://localhost:8080/api/v1/newsletter/subscriber/create`;

                try {
                    const result = await axios.post(url, data);

                    console.log(result);
                    setMessage(true);
                    toggleLoading(false);
                } catch (e) {
                    console.error(e);
                    setError("Fout bij ophalen gegevens.");
                    console.log(error)
                    toggleLoading(false);
                }
            }

            addMailAddress();

            // eslint-disable-next-line
        }
    }

    return (
        <>
            <div className="newsletter">
                <div className="newsletterContainer">
                    <div className="newsletterText">
                        <h2>Aanmelden nieuwsbrief</h2>
                        <p>Blijf op de hoogte van leuke aanbiedingen!</p>
                    </div>
                    <div className="newsletterInput">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                           <FormElement
                               type="text"
                               name="email"
                               label="E-mail"
                               fieldRef={register({
                                   pattern: {
                                       value: /^\S+@\S+$/i,
                                       message: "Ongeldige e-mail"
                                   }
                               })
                               }
                           />

                            <Button
                                value={loading ? <SmallLoadingIndicator /> : "Aanmelden" }
                                usage="button"
                                type="button"
                            />
                            {errors.email ? <span className='errorMessage'>{errors.email.message}</span> : <span>&nbsp;</span>}
                            { message && <span>Je bent succesvol aangemeld!</span>}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter;