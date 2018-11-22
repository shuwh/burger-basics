import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import classes from './Burger.css';

const burger = (props) => {
    const ingredients = props.ingredients;
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_, i) => {
                // return <BurgerIngredient key={igKey + i} type={igKey} />;
                return (
                    <CSSTransition
                        key={igKey + i}
                        timeout={300}
                        classNames={{
                            enter: classes.IngredientEnter,
                            enterActive: classes.IngredientEnterActive,
                            exit: classes.IngredientExit,
                            exitActive: classes.IngredientExitActive,
                        }}
                    >
                        <BurgerIngredient type={igKey} />
                    </CSSTransition>
                )
            })
        })
        .reduce((arr, e) => {
            return arr.concat(e)
        }, []);

    let transformedIngredientsGroup = (
        <TransitionGroup
            component={null}
        >
            {transformedIngredients}
        </TransitionGroup>
    );

    if (transformedIngredients.length === 0) {
        // transformedIngredients = (
        //         <p>Please start adding some Ingredients!</p>
        // )
       transformedIngredientsGroup =  <p>Please start adding some Ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
                {/* {transformedIngredients} */}
                {transformedIngredientsGroup}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;