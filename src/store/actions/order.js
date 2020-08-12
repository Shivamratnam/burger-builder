import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/**
 * Save orders
 * @param {*} orders 
 */
const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}
/**
 * Handle exception on service error
 * @param {*} error 
 */
const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}
/**
 * Start loading
 */
const startLoading = () => {
    return {
        type: actionTypes.START_LOADING
    }
}
/**
 * Stop loading
 */
const stopLoading = () => {
    return {
        type: actionTypes.STOP_LOADING
    }
}
const orderPurchased = () => {
    return {
        type: actionTypes.ORDER_PURCHASED
    }
}
export const resetPurchased = () => {
    return {
        type: actionTypes.RESET_PURCHASED
    }
}
/**
 * Fetch the orders list from the database
 */
export const fetchOrders = () => {
    return dispatch => {
        dispatch(startLoading());
        axios.get('orders.json').then(result => {
            let fetchedOrders = [];
            for (let key in result.data) {
                fetchedOrders.push({
                    ...result.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrderFailed(error));
        });
    }
}
export const submitOrder = (orderData) => {
    return dispatch => {
        dispatch(startLoading());
        axios.post('/orders.json', orderData).then(response => {
            dispatch(orderPurchased());
            dispatch(stopLoading());
        }).catch(error => {
            dispatch(stopLoading());
        });
    }
}