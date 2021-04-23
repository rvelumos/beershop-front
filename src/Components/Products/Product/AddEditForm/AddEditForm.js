import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";

import AddEdit from "../../../Cms/Actions/AddEdit";

import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import Error from "../../../Website/UI/Feedback/Error/Error";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";

import './AddEditForm.css';

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [formValues, setFormValues] = useState({
        manufacturer_id: '',
        name: '',
        price: '',
        taste: '',
        stock: '',
        description: '',
        type: '',
        discount: ''
    });

    useEffect(() => {
        async function getFormData (){
            try {
                const url=`http://localhost:8080/api/v1/product/${id}/`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                const {manufacturer_id,
                    categoryId,
                    name,
                    price,
                    taste,
                    stock,
                    description,
                    type,
                    discount} = result.data;

                setFormValues({
                    manufacturer_id: manufacturer_id,
                    categoryId: categoryId,
                    name: name,
                    price: price,
                    taste: taste,
                    stock: stock,
                    description: description,
                    type: type,
                    discount:discount
                });

            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
            toggleLoading(false);
        }
        if(id!==undefined)
            getFormData();

    // eslint-disable-next-line
    },[])

    const changeHandler = e => {
        setFormValues({[e.target.name]: e.target.value})
    }

    function onSubmitForm(data) {
        console.table(formValues);

        const { categoryId,
            manufacturer_id,
            name,
            price,
            taste,
            stock,
            description,
            type,
            discount
        } = data;

        setFormValues({
            categoryId: categoryId,
            manufacturer_id: manufacturer_id,
            name: name,
            taste: taste,
            price: price,
            stock: stock,
            description: description,
            type: type,
            discount: discount
        });

        setSubmittedForm(true);
    }

    const ProductItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        return(
            <>
                <div className="AddEditForm">
                    <div className="RegisterForm" >
                        <h1>Product {id ? "wijzigen" : "toevoegen"}</h1>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <fieldset>
                                <div className="formElement">
                                    <p>{formValues.id}</p>
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="name"
                                        label="Naam"
                                        formValue={formValues.name}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })
                                        }
                                        error={errors.name ? <span className='error-message'>{errors.name.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="categoryId"
                                        label="Categorie"
                                        formValue={formValues.categoryId}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: 'Verplicht veld',
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })}
                                        error={errors.categoryId ? <span className='error-message'>{errors.categoryId.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="manufacturer_id"
                                        label="Fabrikant"
                                        formValue={formValues.manufacturer_id}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.manufacturer_id ? <span className='error-message'>{errors.manufacturer_id.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="taste"
                                        label="Smaak"
                                        formValue={formValues.taste}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })
                                        }
                                        error={errors.taste ? <span className='error-message'>{errors.taste.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="price"
                                        label="Prijs"
                                        formValue={formValues.price}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[1-9]\d*(\.\d+)?$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.price ? <span className='error-message'>{errors.price.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="stock"
                                        label="Voorraad"
                                        formValue={formValues.stock}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.stock ? <span className='error-message'>{errors.stock.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="description"
                                        label="Beschrijving"
                                        formValue={formValues.description}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                        })
                                        }
                                        error={errors.description ? <span className='error-message'>{errors.description.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="type"
                                        label="Type"
                                        formValue={formValues.type}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.type ? <span className='error-message'>{errors.type.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="discount"
                                        label="Korting"
                                        formValue={formValues.discount}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[1-9]\d*(\.\d+)?$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.discount ? <span className='error-message'>{errors.discount.message}</span> : <span>&nbsp;</span>}
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
                { loading ? <LoadingIndicator /> : <ProductItem /> }
                { error && <Error type="message_container" content={error} /> }
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="product" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
