import React, {useState} from 'react';
import './FormElement.css';

const FormElement = (props) => {
    const [valueLabel, setValueLabel] = useState('');
    const [isActiveLabel, setIsActiveLabel] = useState(false);
    const [mode, setMode] = useState("init");
    const {formValue, name, type, fieldRef, disabled, label, error, form} = props;

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
                <div className="formElementInfo">
                    {error}
                    {form ? <br /> : null }
                    <div id="float-label">
                        <input
                            type={type}
                            placeholder=""
                            disabled={disabled}
                            name={name}
                            defaultValue={valueLabel ? valueLabel : formValue}
                            onChange={(e) => handleTextChange(e.target.value)}
                            ref={fieldRef}
                        />
                        <label className={isActiveLabel ? "Active" : ""} htmlFor={name}>
                            {label}
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormElement;