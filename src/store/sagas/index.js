import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    logoutSaga, 
    checkAuthValidationSaga, 
    authUserSaga, 
    authCheckStatusSage
} from './auth';

import {
    initIngredientsSaga,
} from './burgerBuilder';

import {
    purchaseBurgerSaga,
    fetchOrdersSaga,
    deleteOrderSaga,
} from './order';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthValidationSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATUS, authCheckStatusSage);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
    yield takeEvery(actionTypes.DELETE_ORDER, deleteOrderSaga);
}