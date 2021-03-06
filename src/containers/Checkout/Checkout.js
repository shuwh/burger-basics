import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    // componentWillMount = () => {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let totalPrice = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'totalPrice') {
    //             totalPrice = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: totalPrice,
    //     })
    // };


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    };


    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        totalPrice={this.props.price}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={() => (<ContactData
                            {...this.props}
                        />)}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);