import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'totalPrice') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice,
        })
    };


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    };


    render() {
        // console.log(this.props);
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (<ContactData 
                                        {...this.props}
                                        ingredients={this.state.ingredients}
                                        totalPrice={this.state.totalPrice}
                                    />)}
                />
            </div>
        );
    }
}

export default Checkout;