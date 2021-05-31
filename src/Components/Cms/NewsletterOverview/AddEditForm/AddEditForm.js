import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AddEdit from "../../Actions/AddEdit";
import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";
import './AddEditForm.css';
import axios from "axios";
import Feedback from "../../../Website/UI/Feedback/Feedback";

export function AddEditForm(props) {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [saved, setSaved] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [formValues, setFormValues] = useState({
        name: '',
        content: '',
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`/api/v1/admin/newsletter/${id}/`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                const {name, content} = result.data;

                setFormValues({
                    name: name,
                    content: content
                });
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen nieuwsbrief.");
            }
            toggleLoading(false);
        }
        if(id !== undefined)
            getFormData();
        // eslint-disable-next-line
    },[])

    const changeHandler = e => {
        setFormValues({[e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {
        const { name, content } = data;

        setFormValues({
            name: name,
            content: content,
        })

        setSubmittedForm(true);
    }

    const NewsletterItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        return(
            <>
                <div className="AddEditForm">
                    <div className="RegisterForm" >
                        <h1>Nieuwsbrief {id ? "wijzigen" : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>

                            <fieldset>
                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="name"
                                        label="Naam"
                                        formValue={formValues.name}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                        })}
                                        error={errors.name ? <span className='errorMessage'>{errors.name.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    {errors.content ? <span className='errorMessage'>{errors.content.message}</span> : <span>&nbsp;</span>}
                                    <textarea
                                        name="content"
                                        placeholder="Inhoud"
                                        defaultValue={formValues.content}
                                        ref={register({
                                            required: "Verplicht veld",
                                        })}
                                    />
                                </div>
                            </fieldset>

                            <Button
                                usage="button"
                                value="Versturen "
                            /><br /><br />
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="overview">
                { loading ? <LoadingIndicator /> : <NewsletterItem /> }
                { error && <Feedback type="error" content={error} /> }
                { submittedForm &&
                <AddEdit
                    isAddMode={isAddMode}
                    token={token}
                    section="newsletter"
                    id={id}
                    itemData={formValues}
                    saved={saved}
                    setSaved={setSaved}
                />
                }
            </div>
        </>
    )
}
