import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        }
    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = isValid && (value.trim() !== '');
        }
        if (rules.minLength) {
            isValid = isValid && (value.length >= rules.minLength);
        }
        if (rules.maxLength) {
            isValid = isValid && (value.length <= rules.maxLength);
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControl = {
            ...this.state.controls[inputIdentifier],
        }
        updatedControl.value = event.target.value;
        updatedControl.valid = this.checkValidity(updatedControl.value, updatedControl.validation);
        updatedControl.touched = true;
        
        const updatedControls = {
            ...this.state.controls,
        };
        updatedControls[inputIdentifier] = updatedControl;

        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    };
    
    
    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                key: key,
                config: this.state.controls[key],
            })
        }
        const form = formElementArray.map(formElement => (
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
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapDispathToProps = (dispath) => {
    return {
        onAuth: (email, password) => dispath(actions.auth(email, password)),
    }
}

export default connect(null, mapDispathToProps)(Auth);