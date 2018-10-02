import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
    const ingredients = props.ingredients;
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, e) => {
            return arr.concat(e)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding some Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;