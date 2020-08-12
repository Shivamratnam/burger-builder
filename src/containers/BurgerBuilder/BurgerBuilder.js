import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        // loading: false
    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseStateHandler = ingredients => {
        let ingredientCount = 0;
        ingredientCount = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        return ingredientCount > 0;
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let orderSummary = <OrderSummary
            price={this.props.price}
            ingredients={this.props.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        let burger = null;
        if (this.props.ingredients) {
            const disabledInfo = { ...this.props.ingredients }
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] === 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                    ingredientAdded={(ingredient) => this.props.onAddIngredient(ingredient)}
                    ingredientRemoved={(ingredient) => this.props.onRemoveIngredient(ingredient)}
                    price={this.props.price}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    purchasable={this.updatePurchaseStateHandler(this.props.ingredients)} />
                </Aux>
            );
        } else {
            burger = <Spinner />
        }
        return (
            <Aux>
                <Model visible={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => {
            dispatch(actions.addIngredient(ingredient));
        },
        onRemoveIngredient: (ingredient) => {
            dispatch(actions.removeIngredient(ingredient));
        },
        onInitIngredients: () => {
            dispatch(actions.fetchIngredients());
            dispatch(actions.resetPurchased());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
