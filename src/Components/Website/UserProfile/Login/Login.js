import React, {useState, useContext} from 'react';
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import Error from "../../UI/Feedback/Error/Error";
import {useForm} from "react-hook-form";
import Button from "../../UI/Button/Button";
import FormElement from "../../Forms/FormElement/FormElement";
import './Login.css';
import {AuthContext} from "../../../../context/AuthContext";

const Login = (props) => {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { cmsLogin } = props;
    const { loginUser } = useContext(AuthContext);

    function OnFormSubmit(data) {
         AuthLogin(data);
    }

    async function AuthLogin(props) {
        setError(false);
        toggleLoading(true);

        const username = props.username;
        const password = props.password;
        let url = `http://localhost:8080/authenticate/`;

        try {
            const result = await axios.post(url, {

                    //     manufacturer: !_mf_login_!
                    //     administrator: $_ad_login_$
                    //      customer: %_cu_login_%

                    username: username,
                    password: password
                }
            )

            loginUser(result);
            console.log(result);
        }catch(e) {
                console.error(e);
        }
    }

    // function SaveSession(token) {
    //
    //     const timer = setTimeout(() => {
    //    //     window.location.reload(true);
    //         toggleLoading(false);
    //     }, 500);
    //     return () => clearTimeout(timer);
    // }

    const AuthLoginForm = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange"
        });

        return(
            <>
                <div className="Login">
                    <div className="formContainer" >
                    <h1>Log in</h1>
                    <div className="LoginForm" >
                        <form onSubmit={handleSubmit(OnFormSubmit)}>
                            <fieldset>

                                <FormElement
                                    type="text"
                                    name="username"
                                    label="Gebruikersnaam"
                                    value="username"
                                    fieldRef={register({
                                        required: 'Verplicht veld',
                                    })}
                                    error={errors.username && <span className='error-message'>{errors.username.message}</span>}
                                /><br />

                                <FormElement
                                    type="password"
                                    name="password"
                                    label="Wachtwoord"
                                    value="lastname"
                                    fieldRef={register({
                                        required: 'Verplicht veld',
                                    })}
                                    error={errors.password && <span className='error-message'>{errors.password.message}</span>}
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
                {error && <Error type="message_container" content={error} /> }
                {loading ? <><LoadingIndicator /> LOGIN</> : <AuthLoginForm /> }
            </div>
        </>
    )
}

export default Login;