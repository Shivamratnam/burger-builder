import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            // param would be like: ['salad', '1']
            if (param[0] === 'price') {
                totalPrice =  +param[1];
            } else {
                ingredients[param[0]] = +param[1]; // + to convert string to number
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.path + '/contact-details');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-details'}
                    render={() => (
                        <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props} />
                    )} />
            </div>
        );
    }
}

export default Checkout;