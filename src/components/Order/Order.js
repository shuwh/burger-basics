import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(
            <span
                key={ingredient}
            >{ingredient} ({props.ingredients[ingredient]})</span>
        )
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;