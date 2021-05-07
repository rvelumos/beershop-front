import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";

import AddEdit from "../../../Cms/Actions/AddEdit";

import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";

import './AddEditForm.css';
import Feedback from "../../../Website/UI/Feedback/Feedback";

export function AddEditForm(props) {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const [image, setImage] = useState({
        preview: "",
        raw: ""
    });

    const [formValues, setFormValues] = useState({
        manufacturerId: '',
        name: '',
        price: '',
        taste: '',
        stock: '',
        description: '',
        image: '',
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
                console.log(result);
                const {
                    name,
                    price,
                    taste,
                    stock,
                    description,
                    type,
                    discount} = result.data;

                setFormValues({
                    manufacturerId: result.data.manufacturer.id,
                    categoryId: result.data.category.id,
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
            manufacturerId,
            name,
            price,
            taste,
            stock,
            description,
            type,
            image,
            discount
        } = data;

        setFormValues({
            categoryId: categoryId,
            manufacturerId: manufacturerId,
            name: name,
            taste: taste,
            price: price,
            stock: stock,
            description: description,
            type: type,
            image: image.raw,
            discount: discount
        });

        setSubmittedForm(true);
    }

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    // const handleUpload = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("image", image.raw);
    //
    //     await fetch("YOUR_URL", {
    //         method: "POST",
    //         headers: {
    //
    //         },
    //         body: formData
    //     });
    // };

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
                                        error={errors.name ? <span className='errorMessage'>{errors.name.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.categoryId ? <span className='errorMessage'>{errors.categoryId.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="manufacturerId"
                                        label="Fabrikant"
                                        formValue={formValues.manufacturerId}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            required: "Verplicht veld",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: 'Ongeldige invoer'
                                            }
                                        })
                                        }
                                        error={errors.manufacturerId ? <span className='errorMessage'>{errors.manufacturerId.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.taste ? <span className='errorMessage'>{errors.taste.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.price ? <span className='errorMessage'>{errors.price.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.stock ? <span className='errorMessage'>{errors.stock.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    {errors.description ? <span className='errorMessage'>{errors.description.message}</span> : <span>&nbsp;</span>}
                                    <textarea
                                        name="description"
                                        placeholder="Omschrijving"
                                        defaultValue={formValues.description}
                                        ref={register({
                                            required: "Verplicht veld",
                                        })}
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
                                        error={errors.type ? <span className='errorMessage'>{errors.type.message}</span> : <span>&nbsp;</span>}
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
                                        error={errors.discount ? <span className='errorMessage'>{errors.discount.message}</span> : <span>&nbsp;</span>}
                                    />
                                </div>

                                <div className="formElement">
                                    <img src={image.preview} alt="dummy" width="300" height="300" />
                                    <input
                                        type="file"
                                        id="upload-button"
                                        onChange={handleChange}
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
                { error && <Feedback type="error" content={error} /> }
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="product" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
