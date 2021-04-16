// import React from 'react';
// import { useForm } from 'react-hook-form';
// import './LoginForm.css';
// import Button from "../../UI/Button/Button";
// import FormElement from "../FormElement/FormElement";
//
// const LoginForm = () => {
//     const { register, errors, handleSubmit } = useForm({
//         criteriaMode: "all",
//         mode: "onChange"
//     });
//
//     function onFormSubmit(data) {
//         //e.preventDefault();
//         console.log(data);
//     }
//
//     return(
//         <>
//         <h1>Log in</h1>e
//         <div className="AddressForm" >e
//             <form onSubmit={handleSubmit(onFormSubmit)}>
//                 <fieldset>
// e
//                     <FormElement
//                         type="text"
//                         name="username"
//                         label="Gebruikersnaam"
//                         value="username"
//                         fieldRef={register({
//                             required: 'Verplicht veld',
//                         })}
//                         error={errors.username && <span className='error-message'>{errors.username.message}</span>}
//                     /><br />
//
//                     <FormElement
//                         type="password"
//                         name="password"
//                         label="Paswoord"
//                         value="lastname"
//                         fieldRef={register({
//                             required: 'Verplicht veld',
//                         })}
//                         error={errors.password && <span className='error-message'>{errors.password.message}</span>}
//                     /><br />
//                     <Button value="Inloggen "/>
//
//                     <h1>Registreren</h1>
//                 </fieldset>
//             </form>
//         </div>
//             </>
//
//
//     )
// }
//
// export default LoginForm;