import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrdersList();
    }
    render() {
        let orders = null;
        if (this.props.orders) {
            orders = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            ));
        }
        if (this.props.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersList: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);