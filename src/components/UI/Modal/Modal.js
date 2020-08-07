import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const model = (props) => {
    return (
        <Aux>
            <Backdrop visible={props.visible} clicked={props.modalClosed}/>
            <div
            className="Modal"
            style={{
                transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.visible ? '1' : '0'
            }}>{props.children}</div>
        </Aux>
    );
}

export default model;
