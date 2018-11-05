import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import DeleteSummary from '../../components/Order/DeleteSummary/DeleteSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {
    state = {
        deleting: false,
        orderDeleting: null,
    };

    componentDidMount = () => {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    };

    deleteContinueHandler = () => {
        this.setState({ deleting: false });
        this.props.onDeleteOrder(this.props.token, this.state.orderDeleting.id);
    };

    deleteCancelHandler = () => {
        this.setState({
            deleting: false,
            orderDeleting: null,
        });
    }

    deleteHandler = (order) => {
        this.setState({
            deleting: true,
            orderDeleting: order,
        });
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
                            deleted={() => this.deleteHandler(order)}
                        />);
                })
            } else {
                orders = <p style={{ textAlign: 'center' }}>There is <strong>No</strong> orders right now!</p>
            }
        }
        let deleteSummary = null;
        if (this.state.deleting) {
            console.log(this.state.orderDeleting);
            deleteSummary = <DeleteSummary
                ingredients={this.state.orderDeleting.ingredients}
                price={this.state.orderDeleting.price}
                deleteContinued={this.deleteContinueHandler}
                deleteCancelled={this.deleteCancelHandler}
            />
        }
        return (
            <Aux>
                <Modal show={this.state.deleting} clicked={this.deleteCancelHandler}>
                    {deleteSummary}
                </Modal>
                {orders}
            </Aux>
        );
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

