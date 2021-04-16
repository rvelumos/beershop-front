import React, {useCallback, useState} from 'react';
import FormElement from "../Forms/FormElement/FormElement";
import './Newsletter.css';
import Button from "../UI/Button/Button";
import SmallLoadingIndicator from "../UI/LoadingIndicator/SmallLoadingIndicator";
import axios from "axios";

const Newsletter = () => {

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    const sendRequest = useCallback((e) => {

        e.preventDefault();
        async function addMailAddress() {

            const email = e.target.email.value;

            setError(false);
            toggleLoading(true);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email  })
            };

            let url = `http://localhost:8080/api/v1/newsletter/subscriber/create`;

            try {
                const result = await axios.post(url, requestOptions);

                console.log(result);
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
    }, []);


    return (
        <>
            <div className="newsletter">
                <div className="newsletterContainer">
                    <div className="newsletterText">
                        <h2>Aanmelden nieuwsbrief</h2>
                        <p>Blijf op de hoogte van leuke aanbiedingen!</p>
                    </div>
                    <div className="newsletterInput">
                        <form onSubmit={sendRequest}>
                           <FormElement
                               type="text"
                               name="email"
                               label="E-mail"
                           />
                            <Button
                                value={loading ? <SmallLoadingIndicator /> : "Aanmelden" }
                                usage="button"
                                type="button"
                            />
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter;