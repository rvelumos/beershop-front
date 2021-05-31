import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";

import LoadingIndicator from "../../../Website/UI/LoadingIndicator/LoadingIndicator";
import FormElement from "../../../Website/Forms/FormElement/FormElement";
import Button from "../../../Website/UI/Button/Button";

import './AddEditForm.css';
import Feedback from "../../../Website/UI/Feedback/Feedback";

export function AddEditForm(props) {
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [process, setProcess] = useState("pending");

    const { id } = useParams();
    const { token } = props;
    const isAddMode = !id;

    const[options, setOptions] = useState({
        categories: '',
        manufacturers: ''
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
                const url=`/api/v1/product/${id}`
                const result = await axios.get(url, {
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
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
        async function getOptions(item) {
            let url;
            if(item === 'categories')
                url = `/api/v1/products/categories`;
            else
                url = `/api/v1/manufacturers`;

            try {
                const result = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                if (result) {
                    if(item === 'categories') {
                        setOptions((prevState) => ({
                            ...prevState,
                            categories: result.data
                        }));
                    } else {
                        setOptions((prevState) => ({
                            ...prevState,
                            manufacturers: result.data
                        }));
                    }
                }
            } catch (e) {
                console.error(e);
                setError(`Fout bij ophalen ${item}gegevens.`);
            }
        }
        getOptions("manufacturers");
        getOptions("categories");
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
            image,
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
            image: image,
            price: price,
            stock: stock,
            description: description,
            type: type,
            discount: discount
        });
        saveData(data);
    }

    function saveData(data) {
        let formData = new FormData();

        formData.append("name", data.name);
        formData.append("taste", data.taste);
        formData.append("description", data.description);
        formData.append("type", data.type);
        formData.append("discount", data.discount);
        formData.append("category.id", data.categoryId);
        formData.append("manufacturer.id", data.manufacturerId);
        formData.append("stock", data.stock);
        if(data.image[0] !== undefined)
            formData.append("documents", data.image[0]);
        formData.append("price", data.price);

        async function handleData(formData) {
            setProcess("data");

            let url = `/api/v1/admin/product`;
            if(!isAddMode)
                url = `${url}/${id}`;

            try {
                toggleLoading(true);
                let result;
                if(isAddMode) {
                    result = await axios.post(url, formData, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                } else {
                    result = await axios.put(url, formData, {
                        headers : {
                            "Authorization" : `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                }
                if(result) {
                    setMessage("Data succesvol opgeslagen");
                }
            } catch (e) {
                console.error(e);
                setError("Fout bij verwerken data.");
            }
            toggleLoading(false);
        }
        if (process==="pending")
            handleData(formData);
    }

    const ProductItem = () => {
        const { register, errors, handleSubmit } = useForm({
            criteriaMode: "all",
            mode: "onChange",
        });

        let manufacturerItems;
        if(options.manufacturers !== undefined && options.manufacturers !== "") {
            manufacturerItems = options.manufacturers.map((manufacturers) =>
                 <option key={manufacturers.name} value={manufacturers.id}>{manufacturers.name}</option>
            );
        }

        let categoryItems;
        if(options.categories !== undefined && options.categories !== "") {
            categoryItems = options.categories.map((categories) =>
                <option key={categories.name} value={categories.id}>{categories.name}</option>
            );
        }

        let image;
        if(formValues.image !== "")
            image = <div className="imageContent"><img src={`/product_images/${formValues.image}`} alt={formValues.name} /></div>;

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
                                    {errors.categoryId ? <span className='errorMessage'>{errors.categoryId.message}</span> : <span>&nbsp;</span>}
                                    <select name="categoryId" defaultValue={formValues.categoryId} ref={register({ required: "Verplicht veld" })}>
                                        <option value="">Kies de categorie:</option>
                                        {categoryItems}
                                    </select>
                                </div>

                                <div className="formElement">
                                    {errors.manufacturerId ? <span className='errorMessage'>{errors.manufacturerId.message}</span> : <span>&nbsp;</span>}
                                    <select name="manufacturerId" defaultValue={formValues.manufacturerId} ref={register({ required: "Verplicht veld" })}>
                                        <option value="">Kies de fabrikant:</option>
                                        {manufacturerItems}
                                    </select>
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
                                    <select name="type" defaultValue={formValues.type} ref={register({ required: "Verplicht veld" })}>
                                        <option value="">Kies het type product:</option>
                                        <option value="1">Los bier</option>
                                        <option value="3">Bierpakket</option>
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
                                    <div className="formImage">

                                    {image}
                                    <label htmlFor="upload-button" className="custom-file-upload">
                                        Afbeelding {id ? "vervangen" : "toevoegen"}
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-button"
                                        ref={register}
                                        name="image"
                                       // onChange={handleImageChange}
                                    />
                                    </div>
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
                { message && <Feedback type="success" content={message} />}
            </div>
        </>
    )
}
