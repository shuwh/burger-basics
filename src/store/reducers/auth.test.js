import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({ adapter: new Adapter() });

describe('auth reducer', () => {
    it('should return initial state when default', () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            localId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should store token and userId when logged in', () => {
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'some-user-id',
        };
        expect(reducer(undefined, action)).toEqual({
            idToken: 'some-token',
            localId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })


});
