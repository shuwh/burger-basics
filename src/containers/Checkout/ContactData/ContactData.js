import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    minLength: 3,
                    maxLength: 5,
                },
                valid: false,
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
                },
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
        },
        loading: false
    }

    componentDidMount = () => {
        const orderForm = {
            ...this.state.orderForm
        };
        const deliveryMethod = {
            ...orderForm.deliveryMethod
        };
        deliveryMethod.value = this.state.orderForm.deliveryMethod.elementConfig.options[0].value;
        orderForm.deliveryMethod = deliveryMethod;
        this.setState({
            orderForm: orderForm,
        })
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        };
        console.log(orderData);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderData,
        }
        axios.post('orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            });
    };

    checkValidity = (value, rule) => {
        let isValid = true;
        if (rule.required) {
            isValid = isValid && (value.trim() !== '');
        }
        if (rule.minLength) {
            isValid = isValid && (value.length >= rule.minLength);
        }
        if (rule.maxLength) {
            isValid = isValid && (value.length <= rule.maxLength);
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const orderForm = {
            ...this.state.orderForm
        };
        const orderFormElem = {
            ...orderForm[inputIndentifier]
        };
        orderFormElem.value = event.target.value;
        orderFormElem.valid = this.checkValidity(orderFormElem.value, orderFormElem.validation);
        console.log(orderFormElem);
        orderForm[inputIndentifier] = orderFormElem;
        this.setState({
            orderForm: orderForm,
        });
    };


    render() {
        // console.log(this.props);
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
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.key)}
                    />
                ))}
                <Button
                    btnType='Success'
                >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;