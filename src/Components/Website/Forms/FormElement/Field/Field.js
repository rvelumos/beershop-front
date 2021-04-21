import React from 'react';
import FormElement from "../FormElement";

function Field (props) {

    const {name, label, formValues, setFormValues, errors, register} = props;

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    switch (name) {
        default:
        case "firstname":
        case "lastname":
        case "address":
            return (
                <FormElement
                    type="text"
                    name={name}
                    label={label}
                    onChange={changeHandler}
                    fieldRef={register({
                        required: 'Verplicht veld',
                    })}
                    error={errors.name ? <span className='error-message'>{errors.name.message}</span> : <span>&nbsp;</span>}
                />
            )

        case "email":
            return (
                <FormElement
                    type="text"
                    name="email"
                    defaultValue={formValues.email}
                    label="E-mailadres"
                    onChange={changeHandler}
                    fieldRef={register({
                        required: "Verplicht veld",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Ongeldig e-mailadres"
                        }
                    })
                    }
                    error={errors.email ? <span className='error-message'>{errors.email.message}</span> : <span>&nbsp;</span>}
                />
            )

        case "phone":
            return (
                <FormElement
                    type="text"
                    name="phone"
                    label="Telefoon"
                    formValue={formValues.phone}
                    onChange={changeHandler}
                    fieldRef={register({
                        required: "Verplicht veld",
                        minLength: {
                            value: 10,
                            message: "voer minimaal 10 cijfers in"
                        },
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Alleen cijfers toegestaan"
                        }
                    })
                    }
                    error={errors.phone ? <span className='error-message'>{errors.phone.message}</span> : <span>&nbsp;</span>}
                />
            )
        case "birth_date" :
            return (
                <FormElement
                    type="text"
                    name="birth_date"
                    label="Geboortedatum"
                    defaultValue={formValues.birth_date}
                    onChange={changeHandler}
                    form="form"
                    fieldRef={register({
                        required: 'Verplicht veld',
                        pattern: {
                            value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                            message: 'Ongeldige geboortedatum'
                        }
                    })}
                    error={errors.birth_date ? <span className='error-message'>{errors.birth_date.message}</span> : <span>&nbsp;</span>}
                />
            )
        case "username" :
            return (
                <FormElement
                    type="text"
                    name="username"
                    defaultValue={formValues.username}
                    label="Gebruikersnaam"
                    onChange={changeHandler}
                    fieldRef={register({
                        required: 'Verplicht veld',
                        minLength: {
                            value: 5,
                            message: "Geef tenminste 5 tekens op"
                        }
                    })}
                    error={errors.username ? <span className='error-message'>{errors.username.message}</span> : <span>&nbsp;</span>}
                />
            )
        case "password" :
        case "password_repeat" :
            return(
                <FormElement
                    type="password"
                    name={name}
                    defaultValue={formValues.name}
                    label={label}
                    onChange={changeHandler}
                    fieldRef={register({
                        required: 'Verplicht veld',
                        minLength: {
                            value: 5,
                            message: "Geef tenminste 5 tekens op"
                        },
                        validate: value =>
                                value === name.current || "Wachtwoorden komen niet overeen"
                        }
                    )}
                    error={errors.name ? <span className='error-message'>{errors.name.message}</span> : <span>&nbsp;</span>}
                />
            )
    }
}

export default Field;