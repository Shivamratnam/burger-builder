import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import './ContactData.css'
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/lnput/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                elementValue: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                elementValue: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                elementValue: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                elementValue: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            }, 
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                elementValue: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'ordinary', displayValue: 'Ordinary'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                elementValue: 'fastest',
                validation: null,
                valid: true,
                touched: false
            }
        },
        formValidity: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].elementValue;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            uid: this.props.userId
        }
        this.props.onOrderSubmit(order);
    }

    inputChangedHandler = (event, elementIdentifier) => {
        const newOrderForm = {...this.state.orderForm}; // clone
        const newElement = {...newOrderForm[elementIdentifier]}; // deep clone
        newElement.elementValue = event.target.value;
        newElement.touched = true; // touched status for single element
        newElement.valid = this.checkValidity(newElement.elementValue, newElement.validation); // single element validity check
        newOrderForm[elementIdentifier] = newElement;
        // check whole form validity
        let formValidity = true;
        for (let key in newOrderForm) {
            formValidity = newOrderForm[key].valid && formValidity;
        }
        this.setState({orderForm: newOrderForm, formValidity: formValidity});
    }

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

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button disabled={!this.state.formValidity} buttonType="Success">ORDER</Button> 
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        if (this.props.purchased) {
            form = <Redirect to="/" />
        }

        return (
            <div className="ContactData">
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        userId: state.auth.uid
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmit: (orderData) => dispatch(actions.submitOrder(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);