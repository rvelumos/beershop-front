import React, {useState} from "react";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import './GiftCardForm.css';
import Button from "../../UI/Button/Button";
import {useForm} from "react-hook-form";

function GiftCardForm({giftCardInfo, setGiftCardInfo}) {

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function validateGiftCard(data) {
        const code = data.giftCardCode;
        console.log(code);

        let url = `/api/v1/giftcards/${code}`;
        console.log(url);

        try {
            const result = await axios.get(url);
            if(result.data.length > 0) {
               setGiftCardInfo(result.data);
               localStorage.setItem(`giftcard`, JSON.stringify(result.data));

               const name = result.data[0].name;
               const amount = result.data[0].amount;

               setMessage(`${name} t.w.v. €${amount} is succesvol toegevoegd aan je order!`)
            } else {
                setError("Ongeldige code");
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij ophalen code");
            toggleLoading(false);
        }
    }

    function GiftForm() {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });
        return (
            <>
                <div className="giftCardContainer">
                    <form onSubmit={handleSubmit(validateGiftCard)}>
                        <h2>Cadeaubon:</h2>
                        {error && <span className="errorMessage">{error}</span>}
                        {message && <span className="messageSuccess">{message}</span>}
                        {errors.giftCardCode ? <span className='errorMessage'>{errors.giftCardCode.message}</span> : <span>&nbsp;</span>}
                        <div className="giftCardItem">
                            <input
                                type="text"
                                placeholder="Code invoeren...."
                                name="giftCardCode"
                                className="giftCardItemInput"
                                ref={register({
                                    minLength: {
                                        value: 10,
                                        message: "Ongeldige code"
                                    }
                                })}
                            />
                            <Button
                                value="Toevoegen"
                                usage="buttonCheck"
                                name="giftCardCheck"
                                type="button"
                            /><br/>
                        </div>
                    </form>
                </div>
            </>
        )
    }


    return(
        <>
            {loading ? <LoadingIndicator /> : GiftForm()}
        </>
    )
}

export default GiftCardForm;