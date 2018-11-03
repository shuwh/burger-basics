import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

configure({adapter: new Adapter()});


describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onIngredientInited={() => {}}/>);
    });

    it('should has BurderControls when provided ingredients', () => {
        wrapper.setProps({ings: {salad: 1}});
        expect(wrapper.find(BuilderControls)).toHaveLength(1);
    })

    it('should has Burger when provided with ingredients', () => {
        wrapper.setProps({ings: {salad: 1}});
        expect(wrapper.find(Burger)).toHaveLength(1);
    })
})
