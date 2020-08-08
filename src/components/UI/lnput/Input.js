import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];
    if (!props.valid && props.touched) {
        inputClasses.push('InValidInputStyle');
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.elementValue} 
                    onChange={props.changed}/>
            );
            break;
        case ('textarea'):
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.elementValue} 
                    onChange={props.changed}/>
            );
            break;
        case ('select'):
            inputElement = (
                <select
                    className="SelectElement"
                    value={props.elementValue}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                </select>
            );
            break;
        default:
            inputElement = <input type="text" />;
            break;
    }
    return (
        <div className="Input">
            {inputElement}
        </div>
    );
}

export default input;