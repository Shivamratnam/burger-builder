import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/lnput/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Id'
                },
                elementValue: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                elementValue: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formValidity: false,
        isLogin: false
    }
    /**
     * Checks the validity of the element
     * @param {*} value 
     * @param {*} rules 
     */
    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
        } else {
            return true;
        }
        return isValid;
    }
    /**
     * Updates the state if the input value will change
     * @param {*} event 
     * @param {*} elementIdentifier 
     */
    inputChangedHandler = (event, elementIdentifier) => {
        const newLoginForm = {...this.state.loginForm}; // clone
        const newElement = {...newLoginForm[elementIdentifier]}; // deep clone
        newElement.elementValue = event.target.value;
        newElement.touched = true; // touched status for single element
        newElement.valid = this.checkValidity(newElement.elementValue, newElement.validation); // single element validity check
        newLoginForm[elementIdentifier] = newElement;
        // check whole form validity
        let formValidity = true;
        for (let key in newLoginForm) {
            formValidity = newLoginForm[key].valid && formValidity;
        }
        this.setState({loginForm: newLoginForm, formValidity: formValidity});
    }
    /**
     * Toggle SIGNUP/SIGNIN
     */
    toggleAuthState = () => {
        this.setState({isLogin: !this.state.isLogin});
    }
    /**
     * 
     */
    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.loginForm.email.elementValue,
            this.state.loginForm.password.elementValue,
            this.state.isLogin ? actionTypes.AUTH_LOGIN : actionTypes.AUTH_SIGNUP
        );
    }
    /**
     * Renders the UI on the DOM
     */
    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        let form = (
            <form onSubmit={this.authHandler}>
                {formElementsArray.map(element => (
                    <Input
                        key={element.id}
                        elementType= {element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        elementValue={element.config.elementValue}
                        valid={element.config.valid}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
                ))}
                <Button disabled={!this.state.formValidity} buttonType="Success">{this.state.isLogin ? 'LOGIN' : 'SIGNUP'}</Button> <br />
            </form>
             
        );
        let UI = (
            <div className="Auth">
                <strong style={{color: 'red'}}>
                    {this.props.errorMsg}
                </strong>
                {form}
                <Button buttonType="Danger"
                clicked={this.toggleAuthState}>SWITCH TO {this.state.isLogin ? 'SIGNUP' : 'LOGIN' }</Button>
            </div>
        );
        if (this.props.loading) {
            UI = <Spinner />
        }
        return UI
    }
}

const mapStateToProps = state => {
    return {
        errorMsg: state.auth.authErrorMsg,
        loading: state.auth.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, authType) => dispatch(actions.auth(email, password, authType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);