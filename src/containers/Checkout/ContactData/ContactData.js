import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            stree: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {

                },
                valid: true,
                touched: true,
            },
        },
        formIsValid: false,
    }

    // componentDidMount = () => {
    //     const orderForm = {
    //         ...this.state.orderForm
    //     };
    //     const deliveryMethod = {
    //         ...orderForm.deliveryMethod
    //     };
    //     deliveryMethod.value = this.state.orderForm.deliveryMethod.elementConfig.options[0].value;
    //     orderForm.deliveryMethod = deliveryMethod;
    //     this.setState({
    //         orderForm: orderForm,
    //     })
    // };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        };
        // console.log(orderData);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderData,
            userId: this.props.userId,
        }
        this.props.onPurchaseBurgerStart(order, this.props.token);
    };

    inputChangedHandler = (event, inputIndentifier) => {
        // const orderForm = {
        //     ...this.state.orderForm
        // };
        // const orderFormElem = {
        //     ...orderForm[inputIndentifier]
        // };
        // orderFormElem.value = event.target.value;
        // orderFormElem.valid = checkValidity(orderFormElem.value, orderFormElem.validation);
        // orderFormElem.touched = true;
        // orderForm[inputIndentifier] = orderFormElem;

        const orderForm = updateObject(this.state.orderForm, {
            [inputIndentifier]: updateObject(this.state.orderForm[inputIndentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputIndentifier].validation),
                touched: true,
            })
        })

        let formIsValid = true;
        for (let key in orderForm) {
            formIsValid = orderForm[key].valid && formIsValid;
        }

        this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
        });
    };


    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                key: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.key}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.key)}
                    />
                ))}
                <Button
                    disabled={!this.state.formIsValid}
                    btnType='Success'
                >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.localId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurgerStart: (orderData, token) => dispatch(purchaseBurger(orderData, token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));