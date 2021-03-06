import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <p>Total Price: <strong>USD {Number.parseFloat( props.totalPrice ).toFixed(2)}</strong></p>
            <Button 
                btnType='Danger' 
                clicked={props.checkoutCancelled}
            >CANCEL</Button>
            <Button 
                btnType='Success' 
                clicked={props.checkoutContinued}
            >CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;