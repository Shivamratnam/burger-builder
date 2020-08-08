import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }

    const ingredientsDisplay = ingredients.map(ingredient => (
        <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                border: '1px solid #ccc',
                margin: '0 5px',
                padding: '5px'
            }}>{ingredient.name} ({ingredient.quantity})
        </span>
    ));

    return (
        <div className="Order">
            <p>Ingredients: {ingredientsDisplay}  </p>
            <p>Price: <strong>{props.price} Rs.</strong></p>
        </div>
    );
}

export default order;