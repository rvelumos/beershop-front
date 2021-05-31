import React, {useState} from 'react';
import FormElement from "../Forms/FormElement/FormElement";
import './Newsletter.css';
import Button from "../UI/Button/Button";
import SmallLoadingIndicator from "../UI/LoadingIndicator/SmallLoadingIndicator";
import axios from "axios";
import {useForm} from "react-hook-form";
import Feedback from "../UI/Feedback/Feedback";

const Newsletter = () => {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(false);
    const [mode, setMode] = useState('init');
    const [formValue, setFormValue] = useState({
        email: ''
    })
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
        mode: "onChange",
    });

    function onSubmitForm (data) {
        setFormValue({
            email: data.email
        })
        SaveEmail(data);
    }

    function SaveEmail(data) {
        if(mode==="init" && data.email !== "") {
            setMode("insert");
            async function addMailAddress() {
                toggleLoading(true);

                const url = `/api/v1/newsletter/subscriber/create`;
                try {
                    const result = await axios.post(url, {
                        email: data.email
                    });
                    if(result)
                        setMessage(true);
                } catch (e) {
                    console.error(e);
                    setError("Fout bij ophalen gegevens.");
                }
                toggleLoading(false);
            }
            addMailAddress();
        }
    }

    return (
        <>
            <div className="newsletter">
                <div className="newsletterContainer">
                    <div className="newsletterText">
                        {error && <Feedback type="error" content={error} />}
                        <h2>Aanmelden nieuwsbrief</h2>
                        <p>Blijf op de hoogte van leuke aanbiedingen!</p>
                    </div>
                    {errors.email && <div className="newsletterMobile"><span className='errorMessage'>{errors.email.message}</span></div> }
                    <div className="newsletterInput">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                           <FormElement
                               type="text"
                               name="email"
                               label="E-mail"
                               formValue={formValue.email}
                               fieldRef={register({
                                   required:  "Vul e-mail in",
                                   minLength: {
                                       value: 5,
                                       message: "Ongeldige e-mail"
                                   },
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
                            {errors.email && <div className="newsletterWeb"><span className='errorMessage'>{errors.email.message}</span></div>}
                            { message && <span>Je bent succesvol aangemeld!</span>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter;