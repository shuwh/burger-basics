import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css'

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Meat', type: 'meat'},
    {label:'Cheese', type: 'cheese'},
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <BuildControl 
                        key={control.label} 
                        label={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabled[control.type]}/>
            })}
        </div>
    );
}

export default buildControls;