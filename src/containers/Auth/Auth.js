import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

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
        },
        isSignup: false,
    }

    componentDidMount = () => {
        if (!this.props.BuildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    };


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = updateObject(this.state.controls, {
            [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true,
            }),
        });

        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isSignup: !prevState.isSignup,
            }
        })
    };


    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                key: key,
                config: this.state.controls[key],
            })
        }
        let form = formElementArray.map(formElement => (
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
        if (this.props.loading) {
            form = <Spinner />;
        }
        const errorMessage = this.props.error ? <p style={{ color: 'red' }}>{this.props.error.message}</p> : null;
        const authRedirect = this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null;

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h2>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</h2>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        BuildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispathToProps = (dispath) => {
    return {
        onAuth: (email, password, isSignup) => dispath(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispath(actions.setAuthRedirectPath('/')),
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Auth);