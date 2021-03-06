import React from 'react';
import './Modal.css';

function Modal({handler, title, item}) {
    function itemRows() {
        if(item !== undefined) {
            return(
                <>
                    <div className="modalItem">
                        <div>Geslacht</div><div>{item.sex}</div>
                    </div>
                    <div className="modalItem">
                        <div>Naam</div><div>{item.firstname} {item.lastname}</div>
                    </div>
                    <div className="modalItem">
                        <div>E-mail</div><div>{item.email}</div>
                    </div>
                    <div className="modalItem">
                        <div>Telefoon</div><div>{item.phone}</div>
                    </div>
                    <div className="modalItem">
                        <div>Geboortedatum</div><div>{item.birthDate}</div>
                    </div>
                </>
            )
        } else {
            return (
                <p className='errorContainer'>Geen gegevens gevonden</p>
            )
        }
    }

    return (
        <div className="modalBackdrop">
            <div className="modal" >
                <div className="close" onClick={handler}>&#10008;</div>
                <h2>{title}</h2>
                <div className="modalContainer">
                     {itemRows()}
                </div>
            </div>
        </div>
    )
}

export default Modal;