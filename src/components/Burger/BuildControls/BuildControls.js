import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' }
    ]
    return(
        <div className="BuildControls">
            <h2>Total Price: {props.price} Rs.</h2>
            {controls.map(control => (
                <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]} />
            ))}
            <button
            className="OrderButton"
            disabled={!props.purchasable}
            onClick={props.ordered}>Order Now</button>
        </div>
    );
}

export default buildControls;
