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
    const[categoryOptions, setCategoryOptions] = useState("");

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
                const url=`/api/v1/product/${id}`
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
                    image,
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
                    image: image,
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

    useEffect(() => {
        async function getCategoryItems() {
            try {
                const url = `/api/v1/products/categories`;
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                if (result) {
                    setCategoryOptions(result.data);
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij ophalen gegevens.");
            }
        }

        getCategoryItems();
        // eslint-disable-next-line
    }, [])

    function onSubmitForm(data) {
        const { categoryId,
            manufacturerId,
            name,
            price,
            taste,
            stock,
            description,
            type,
            discount
        } = data;

        setFormValues({
            category: {
                id: categoryId
            },
            manufacturer: {
                id: manufacturerId
            },
            name: name,
            taste: taste,
            image: image.raw,
            price: price,
            stock: stock,
            description: description,
            type: type,
            discount: discount
        });

        console.table(data);
        setSubmittedForm(true);
    }

    const handleChange = e => {
        const uploadFile = e.target.files[0];

        console.log(uploadFile.type);
        if (uploadFile !== "") {
            if (uploadFile.type === "image/jpeg" || uploadFile.type === "image/jpg" || uploadFile.type === "image/png") {
                console.log("IMAGE")
                console.log(e.target.files)
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                uploadImage();
            } else {
                setError("Ongeldig bestand: alleen .png en .jpg toegestaan");
            }
        }
    };

    async function uploadImage() {
        const imageData = image.raw;
        console.log("IMAGE DATA uploadimage");
        console.log(imageData);
        console.log(token);
        //const FormData = require('form-data');

        let formData = new FormData();
        formData.append("file", imageData);

        try {
            const url = `/api/v1/admin/forms/upload`;
            const result = await axios.post(url, formData,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            if (result) {
                console.log("Image opgeslagen")
            }
        } catch (e) {
            console.error(e);
            setError("Fout bij ophalen gegevens.");
        }
    }

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

        let categoryItems;
        if(categoryOptions !== "") {
            console.log(categoryOptions)
            categoryItems = categoryOptions.map((categoryItem) =>
                <option key={categoryItem.name} value={categoryItem.id}>{categoryItem.name}</option>
            );
        }

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
                                    {errors.type ? <span className='errorMessage'>{errors.type.message}</span> : <span>&nbsp;</span>}
                                    <select name="categoryId" ref={register({ required: true })}>
                                        <option value="">Kies de categorie:</option>
                                        {categoryItems}
                                    </select>
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
                                    {errors.type ? <span className='errorMessage'>{errors.type.message}</span> : <span>&nbsp;</span>}
                                    <select name="type" ref={register({ required: true })}>
                                        <option value="">Kies het type product:</option>
                                        <option value="1">Los bier</option>
                                        <option value="3">Bierpakket</option>
                                        <option value="4">Cadeaubon</option>
                                    </select>
                                </div>

                                <div className="formElement">
                                    <FormElement
                                        type="text"
                                        name="discount"
                                        label="Korting"
                                        formValue={formValues.discount}
                                        onChange={changeHandler}
                                        fieldRef={register({
                                            pattern: {
                                                value: /^[1-9][0-9]?$|^100$/,
                                                message: 'Voer een geldige waarde tussen 1-100 in'
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
                { error && <Feedback type="error" content={error} /> }
                { loading ? <LoadingIndicator /> : <ProductItem /> }
                { submittedForm &&  <AddEdit isAddMode={isAddMode} token={token} section="product" id={id} itemData={formValues}/> }
            </div>
        </>
    )
}
