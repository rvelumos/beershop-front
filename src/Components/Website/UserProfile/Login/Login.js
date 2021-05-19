import React, {useState, useContext} from 'react';
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import {useForm} from "react-hook-form";
import Button from "../../UI/Button/Button";
import FormElement from "../../Forms/FormElement/FormElement";
import './Login.css';
import {AuthContext} from "../../../../context/AuthContext";
import Feedback from "../../UI/Feedback/Feedback";

const Login = ({cmsLogin}) => {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [formValue, setFormvalue] = useState({
        username: '',
        password: ''
    })

    const { login } = useContext(AuthContext);

    function OnFormSubmit(data) {
         AuthLogin(data);
    }

    async function AuthLogin({username, password}) {
        toggleLoading(true);

        let url = `/api/v1/authenticate`;

        try {
            const result = await axios.post(url, {

                    //     manufacturer: !_mf_login_!
                    //     administrator: $_ad_login_$
                    //      customer: %_cu_login_%
                    //      klanttest: %_cu_login_%

                    username: username,
                    password: password
                }
            )
            if(result.data.jwt !== "") {
                login(result.data.jwt);
            } else {
                setError("Ongeldige inloggegevens. Controleer de spelling en probeer het opnieuw.")
            }
        }catch(e) {
            console.error(e);
            toggleLoading(false);
        }
    }

    const AuthLoginForm = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange"
        });

        return(
            <>
                <div className="Login">
                    <div className="formContainer" >
                    <h2>Log in</h2>
                    <div className="LoginForm" >
                        <form onSubmit={handleSubmit(OnFormSubmit)}>
                            <fieldset>

                                <FormElement
                                    type="text"
                                    name="username"
                                    label="Gebruikersnaam"
                                    formValue={formValue.username}
                                    setFormValue={setFormvalue}
                                    fieldRef={register({
                                        required: 'Verplicht veld',
                                    })}
                                    error={errors.username && <span className='errorMessage'>{errors.username.message}</span>}
                                /><br />

                                <FormElement
                                    type="password"
                                    name="password"
                                    label="Wachtwoord"
                                    formValue={formValue.password}
                                    setFormValue={setFormvalue}
                                    fieldRef={register({
                                        required: 'Verplicht veld',
                                    })}
                                    error={errors.password && <span className='errorMessage'>{errors.password.message}</span>}
                                /><br />
                                <Button usage="button" value="Inloggen "/><br /><br />
                                {cmsLogin ? null :<span>Geen account? Klik dan <a href="/registreren">hier</a> om te registreren.</span> }

                            </fieldset>
                        </form>
                    </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="loginContainer">
                {error && <Feedback type="error" content={error} /> }
                {loading ? <><LoadingIndicator /> Je wordt ingelogd...</> : <AuthLoginForm /> }
            </div>
        </>
    )
}

export default Login;