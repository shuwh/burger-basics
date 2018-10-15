import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
    }
    componentDidMount = () => {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    })
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false,
                })
                // console.log(fetchedOrders);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            })
    };

    render() {
        let orders = this.state.loading ? <Spinner /> : null;
        if (this.state.orders) {
            orders = this.state.orders.map(order => {
                return (
                    <Order
                        ingredients={order.ingredients}
                        price={order.price}
                        key={order.id}
                    />);
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);

