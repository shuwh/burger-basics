import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    try {
        yield put(actions.purchaseBurgerStart());
        const response = yield axios.post('orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key,
            })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}

export function* deleteOrderSaga(action) {
    const queryParams = yield '?auth=' + action.token;
    try {
        yield axios.delete('/orders/' + action.orderId + '.json' + queryParams)
        yield put(actions.deleteOrderSuccess(action.orderId));
    } catch (error) {
        yield put(actions.deleteOrderFail(error));
    }
}