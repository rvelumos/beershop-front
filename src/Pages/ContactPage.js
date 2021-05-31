import React from 'react';
import ContactForm from "../Components/Website/Forms/ContactForm/ContactForm";
import BreadCrumbs from "../Components/Website/Navigation/BreadCrumbs/BreadCrumbs";

const ContactPage = () => {
    return (
        <>
            <div className="mainTop">
                <BreadCrumbs
                    activeItem="Contact"
                />
            </div>
            <div className="mainContent">
                <div className="ContactPage">
                    <h1>Contact</h1>
                    <p>Indien je graag meer wilt te komen over de historie van ons, het bier wat we verkopen of heb je wellicht andere vragen/opmerkingen, aarzel dan niet om via onderstaand formulier contact op te nemen. We nemen dan zo spoedig mogelijk contact met je op.</p>
                    <ContactForm />
                </div>
            </div>
        </>

    )
}

export default ContactPage;