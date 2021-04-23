import React, {useState} from 'react';
import './FormElement.css';

const FormElement = (props) => {
    const [valueLabel, setValueLabel] = useState('');
    const [isActiveLabel, setIsActiveLabel] = useState(false);
    const [mode, setMode] = useState("init");
    const {formValue} = props;

    if(formValue !== "" && mode === "init") {
        setIsActiveLabel(true);
        setMode('loading');
    }

    function handleTextChange(text) {
        if (text !== '') {
            setIsActiveLabel(true);
        } else {
            setIsActiveLabel(false);
        }
        setValueLabel(text);
    }

    return (
        <>
            <div className="formElementContainer">
                {/*<div className="productImage">*/}

                {/*</div>*/}
                <div className="formElementInfo">
                    {props.error}
                    {props.form ? <br /> : null }
                    <div id="float-label">
                        <input
                            type={props.type}
                            placeholder=""
                            // defaultValue=""
                            name={props.name}
                            value={valueLabel ? valueLabel : formValue}
                            onChange={(e) => handleTextChange(e.target.value)}
                            ref={props.fieldRef}
                        />

                        <label className={isActiveLabel ? "Active" : ""} htmlFor={props.name}>
                            {props.label}
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormElement;