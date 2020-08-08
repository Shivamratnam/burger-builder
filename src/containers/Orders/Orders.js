import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import AxiousInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state={
        orders: [],
        loading: false
    }
    componentDidMount() {
        this.setState({loading: true});
        AxiousInstance.get('./orders.json').then(res => {
            console.log(res.data);
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
            console.log(this.state);
        }).catch(error => {
            this.setState({loading: false});
        });
    }
    render() {
        const orders = this.state.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        ));
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;