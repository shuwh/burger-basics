import React, { Component } from 'react';
import { connect } from 'react-redux';


import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as bugerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount = () => {
        this.props.onIngredientInited();
    };


    updatePurchaseStatus(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // const queryParam = [];
        // for (let param in this.props.ings) {
        //     queryParam.push(encodeURIComponent(param)
        //         + '='
        //         + encodeURIComponent(this.props.ings[param]));
        // }
        // const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString + '&totalPrice=' + this.props.price
        });
    }

    render() {
        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>The ingredients cannot be loaded!</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ings) {
            let disabledInfo = { ...this.props.ings };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseStatus(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.price.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings} />;
        };
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (igName) => dispatch(bugerBuilderActions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(bugerBuilderActions.removeIngredient(igName)),
        onIngredientInited: () => dispatch(bugerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));