import React from 'react';
import './Button.css';

const button = (props) => {
    const buttonClasses = ['Button', props.buttonType];
    return (
        <button
        className={buttonClasses.join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</button>
    );
}

export default button;
