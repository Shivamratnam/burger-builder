import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
    salad: 3,
    meat: 5,
    bacon: 7,
    cheese: 10
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseStateHandler(ingredients) {
        let ingredientCount = 0;
        ingredientCount = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        this.state.purchasable = ingredientCount > 0;
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStateHandler(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStateHandler(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Roofer Max",
                address: {
                    street: "testStreet1",
                    zipCode: "123456",
                    state: "Mumbai",
                    country: "India"
                },
                email: "roofer.max@gmail.com"
            },
            deliveryMethod: "Fastest"
        }
        AxiosInstance.post('/orders.json', order).then(response => {
            this.setState({loading: false, purchasing: false});
        }).catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }
    // loadingStateHandler = () => {
    //     this.state.loading = 
    // }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Model visible={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredienthandler}
                ingredientRemoved={this.removeIngredientHandler}
                price={this.state.totalPrice}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
