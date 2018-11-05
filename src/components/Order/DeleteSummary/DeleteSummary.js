import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const DeleteSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>Delete Burger Order</h3>
            <p>You are about to permanently delete this Burger Order:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Totoal Price: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Continue to Delete?</p>
            <Button btnType='Success' clicked={props.deleteCancelled}>CANCEL</Button>
            <Button btnType='Danger' clicked={props.deleteContinued}>DELETE</Button>
        </Aux>
    );
}

export default DeleteSummary;