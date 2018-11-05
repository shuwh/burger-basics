import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount = () => {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    };

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            if (this.props.orders.length > 0) {
                orders = this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                            deleteOrder={() => this.props.onDeleteOrder(this.props.token, order.id)}
                        />);
                })
            } else {
                orders = <p style={{ textAlign: 'center' }}>There is <strong>No</strong> orders right now!</p>
            }
        }
        // console.log('After fetch data:', this.props.orders);
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.localId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (token, orderId) => dispatch(actions.deleteOrder(token, orderId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

