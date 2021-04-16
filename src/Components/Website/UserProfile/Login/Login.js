import React, {useState} from 'react';
import axios from "axios";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
import Error from "../../UI/Feedback/Error/Error";
import {useForm} from "react-hook-form";
import Button from "../../UI/Button/Button";
import FormElement from "../../Forms/FormElement/FormElement";
// import { useHistory } from "react-router-dom";
import './Login.css';

const Login = (props) => {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { cmsLogin } = props;

    // const history = useHistory();

    function OnFormSubmit(data) {
         AuthLogin(data);
    }

    function SaveSession(data, token) {
        console.log(data);
        console.log(token);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user_token", token);

        toggleLoading(true);

        const timer = setTimeout(() => {
       //     window.location.reload(true);
            toggleLoading(false);
        }, 500);
        return () => clearTimeout(timer);
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

                    {/*<div className="formContainer" >*/}
                    {/*    <h1>Gast</h1>*/}
                    {/*    <div className="register">*/}
                    {/*        <p>Indien je als gast wilt bestellen, klik dan op onderstaande button.</p><p><a href="/stap2" className="button">Ga verder</a></p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </>
        )
    }

    const AuthLogin = (props) => {
        setError(false);
        toggleLoading(true);

        const username = props.username;
        const password = props.password;
        let url = `http://localhost:8080/authenticate/`;
        console.log("username: "+ username + " wachtwoord: " + password);
        axios.post(url, {

        //     manufacturer: !_mf_login_!
        //     administrator: $_ad_login_$
        //      customer: %_cu_login_%

        username: username,
        password: password},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response_jwt) => {
                    const token = response_jwt.data;
                    axios.get(`http://localhost:8080/authenticated`, {
                        headers: {
                            "Authorization" : `Bearer ${token.jwt}`,
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*"}
                    })
                        .then(response_auth => {
                            localStorage.setItem("user", JSON.stringify(response_auth.data));
                            console.log(token.jwt);
                            SaveSession(response_auth, token.jwt);

                            toggleLoading(false);
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch((errorResponse) => {
                console.error(errorResponse);
                toggleLoading(false)
                setError("Ongeldige inloggegevens, probeer het opnieuw");
            });
    }

    return (
        <>
            <div className="loginContainer">
                {error && <Error type="message_container" content={error} /> }
                {loading ? <LoadingIndicator /> : <AuthLoginForm /> }
            </div>
        </>
    )
}

export default Login;