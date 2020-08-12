import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/**
 * Adds an ingredient to the burger
 * @param {*} igName 
 */
export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: igName
    }
}
/**
 * Removes an ingredient from the burger
 * @param {*} igName 
 */
export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: igName
    }
}
/**
 * Initialize the ingredients
 * @param {*} ingredients 
 */
const setIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}
/**
 * Fetch the initial ingredients data from the database
 */
export const fetchIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json').then(result => {
            dispatch(setIngredients(result.data));
        }).catch(error => {
            console.log(error);
        });
    }
}