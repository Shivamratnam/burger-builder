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
            // It's not a good practice (a security issue)
            orders = this.props.orders.filter(order => this.props.userId === order.uid);
            if (orders.length === 0) {
                orders = <strong>You do not have any order history.</strong>;
            } else {
                orders = orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                ));
            }
        }
        if (this.props.loading) {
            orders = <Spinner />
        }
        return (
            <div style={{textAlign: 'center'}}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.uid
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersList: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);