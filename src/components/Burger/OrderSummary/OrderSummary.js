import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(key => {
    return <li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}</li>
    });
    return(
        <Aux>
            <h3>Your Orders</h3>
            <p>Your burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p> <strong>Total Price: {props.price}</strong> </p>
            <h3>Continue to Checkout?</h3>
            <Button buttonType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;
