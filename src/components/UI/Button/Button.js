import React from 'react';
import './Button.css';

const button = (props) => {
    const buttonClasses = ['Button', props.buttonType];
    return (
        <button
        className={buttonClasses.join(' ')}
        onClick={props.clicked}>{props.children}</button>
    );
}

export default button;
