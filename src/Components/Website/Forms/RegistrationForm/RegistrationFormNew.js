// import React, {useRef, useState} from 'react';
// import './RegistrationForm.css';
// import FormElement from "../FormElement/FormElement";
// import {useForm} from "react-hook-form";
// import Button from "../../UI/Button/Button";
// import axios from "axios";
// import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator";
// import Error from "../../UI/Feedback/Error/Error";
// import {Link} from "react-router-dom";
// import Field from "../FormElement/Field/Field";
//
// const RegistrationFormNew = () => {
//
//     const [error, setError] = useState(false);
//     const [loading, toggleLoading] = useState(false);
//     const [sentForm, setSentForm] = useState(false);
//
//     const [formValues, setFormValues] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phone: '',
//         birth_date: '',
//         password: '',
//         password_repeat: ''
//     });
//
//     // const changeHandler = e => {
//     //     setFormValues({...formValues, [e.target.name]: e.target.value})
//     // }
//
//     function onSubmitForm(data) {
//
//         console.table(data);
//
//         if(error === false) {
//             createLogin({
//                 username: data.username,
//                 password: data.password,
//                 email: data.email,
//             })
//
//             createRegistration({
//                 firstname: data.firstname,
//                 lastname: data.lastname,
//                 email: data.email,
//                 phone: data.phone,
//                 birth_date: data.birth_date,
//             })
//         } else {
//             console.log(error);
//         }
//     }
//
//     async function createLogin(userData) {
//
//         setError(false);
//         toggleLoading(true);
//
//         let url = `http://localhost:8080/api/v1/create_user/`;
//
//         try {
//             const result = await axios.post(url, userData);
//             console.log("User result: "+result);
//
//             url = `http://localhost:8080/api/v1/create_authority/`;
//             try {
//                 const result = await axios.post(url, {
//                     authority: "ROLE_CUSTOMER",
//                     username: userData.username
//                 })
//
//                 console.log("Role result: "+result);
//             }catch (e) {
//                 console.error(e);
//                 setError("Fout bij verwerken logingegevens.");
//                 toggleLoading(false);
//             }
//
//             toggleLoading(false);
//         } catch (e) {
//             console.error(e);
//             setError("Fout bij verwerken logingegevens.");
//             toggleLoading(false);
//         }
//     }
//
//     async function createRegistration(customerData) {
//         setError(false);
//         toggleLoading(true);
//
//         let url = `http://localhost:8080/api/v1/customer/`;
//
//         try {
//             const result = await axios.post(url, customerData);
//             setSentForm(true);
//         } catch (e) {
//             console.error(e);
//             setError("Fout bij verwerken registratiegegevens.");
//         }
//         toggleLoading(false);
//     }
//
//     const RegistrationFormItems = () => {
//         const [checkedTerms, toggleCheckedTerms] = useState(false);
//         const { register, errors, watch, handleSubmit } = useForm({
//             criteriaMode: "all",
//             mode: "onChange",
//         });
//         const password = useRef({});
//         password.current = watch("password", "");
//
//         return(
//             <>
//                 <div className="Register">
//                     <div className="formContainer" >
//                         <div className="RegisterForm" >
//                             <h1>Registreren</h1>
//                             <form onSubmit={handleSubmit(onSubmitForm)}>
//
//                                 <h3>Account informatie</h3>
//                                 <fieldset>
//                                     <div className="formElement">
//                                         <Field name="firstname" label="Voornaam" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//
//                                     <div className="formElement">
//                                         <Field name="lastname" label="Achternaam" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//
//                                     <div className="formElement">
//                                         <Field name="email" label="E-mail adres" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//
//                                     <div className="formElement">
//                                         <Field name="phone" label="Telefoon" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//
//                                     <div className="formElement">
//                                         <Field name="birth_date" label="Geboortedatum" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//                                 </fieldset>
//
//                                 {/*<h3>Adresgegevens</h3>*/}
//                                 {/*<fieldset>*/}
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="postalcode"*/}
//                                 {/*            label="Postcode"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: {*/}
//                                 {/*                    value: true,*/}
//                                 {/*                    message: "Verplicht veld",*/}
//                                 {/*                },*/}
//                                 {/*                pattern: {*/}
//                                 {/*                    value:  /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,*/}
//                                 {/*                    message: "Ongeldige postcode, controleer de input",*/}
//                                 {/*                },*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.postalcode ? <span className='error-message'>{errors.postalcode.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="street"*/}
//                                 {/*            label="Straat"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: 'Verplicht veld',*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.street ? <span className='error-message'>{errors.street.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <span>&nbsp;</span>*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="street_add"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            label="Straat (toevoegsel)"*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="number"*/}
//                                 {/*            label="Huisnummer"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: 'Verplicht veld',*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.street_add ? <span className='error-message'>{errors.street_add.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="city"*/}
//                                 {/*            label="Stad"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: 'Verplicht veld',*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.city ? <span className='error-message'>{errors.city.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="province"*/}
//                                 {/*            label="Provincie"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: 'Verplicht veld',*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.province ? <span className='error-message'>{errors.province.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*    <div className="formElement">*/}
//                                 {/*        <FormElement*/}
//                                 {/*            type="text"*/}
//                                 {/*            name="country"*/}
//                                 {/*            label="Land"*/}
//                                 {/*            onChange={changeHandler}*/}
//                                 {/*            fieldRef={register({*/}
//                                 {/*                required: 'Verplicht veld',*/}
//                                 {/*            })}*/}
//                                 {/*            error={errors.country ? <span className='error-message'>{errors.country.message}</span> : <span>&nbsp;</span>}*/}
//                                 {/*        />*/}
//                                 {/*    </div>*/}
//
//                                 {/*</fieldset>*/}
//
//                                 <h3>Inloggegevens</h3>
//                                 <fieldset>
//
//                                     {/*<div className="formElement">*/}
//                                     {/*    <FormElement*/}
//                                     {/*        type="text"*/}
//                                     {/*        name="password"*/}
//                                     {/*        defaultValue={formValues.username}*/}
//                                     {/*        label="Gebruikersnaam"*/}
//                                     {/*        onChange={changeHandler}*/}
//                                     {/*        fieldRef={register({*/}
//                                     {/*            required: 'Verplicht veld',*/}
//                                     {/*            minLength: {*/}
//                                     {/*                value: 5,*/}
//                                     {/*                message: "Geef tenminste 5 tekens op"*/}
//                                     {/*            }*/}
//                                     {/*        })}*/}
//                                     {/*        error={errors.username ? <span className='error-message'>{errors.username.message}</span> : <span>&nbsp;</span>}*/}
//                                     {/*    />*/}
//                                     {/*</div>*/}
//
//                                     <div style={{width: "100%"}}></div>
//
//                                     <div className="formElement">
//                                         <Field name="password" label="Wachtwoord" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//
//                                     <div className="formElement">
//                                         <Field name="password_repeat" label="Wachtwoord nogmaals" register={register} formValues={formValues} setFormValues={setFormValues} errors={errors} />
//                                     </div>
//                                     </fieldset><br />
//                                     {errors.conditions && <p className='error-message'>{errors.conditions.message}</p>}
//
//                                     <input
//                                         type="checkbox"
//                                         name="conditions"
//                                         id="conditions"
//                                         checked={checkedTerms}
//                                         onChange={() => toggleCheckedTerms(!checkedTerms)}
//                                         ref={register({
//                                             required: 'Je dient akkoord te gaan met de voorwaarden',
//                                         })}
//                                     />
//
//                                     <label htmlFor="conditions">Ik heb de <a href="/info/voorwaarden" target="_blank">voorwaarden</a> doorgelezen en ga akkoord</label><br /><br />
//
//                                     <Button
//                                         disabled={!checkedTerms}
//                                         usage="button"
//                                         value="Versturen "
//                                     /><br /><br />
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
//
//     function confirmRegistration () {
//         return(
//             <div>
//                 <h2>Je bent succesvol geregistreerd!</h2>
//                 <p>Klik <Link to='/mijn_account'>hier</Link> om verder te gaan.</p>
//             </div>
//         )
//     }
//
//     return (
//         <>
//             <div className="RegistrationOverview">
//                 {loading ? <LoadingIndicator /> : null }
//                 {sentForm ? confirmRegistration() : <RegistrationFormItems /> }
//                 {error && <Error type="message_container" content={error} /> }
//             </div>
//         </>
//     )
// }
//
// export default RegistrationFormNew;