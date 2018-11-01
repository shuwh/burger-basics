import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import asynComponent from './hoc/asynComponent/asynComponent';

const asynAuth = asynComponent(() => import('./containers/Auth/Auth'));
const asynCheckout = asynComponent(() => import('./containers/Checkout/Checkout'));
const asynOrders = asynComponent(() => import('./containers/Orders/Orders'));
const asynLogout = asynComponent(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignin();
  };

  render() {
    // console.log(import('./containers/Auth/Auth'));
    let routes = (
      <Switch>
        <Route path='/auth' component={asynAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>

    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asynCheckout} />
          <Route path='/orders' component={asynOrders} />
          <Route path='/logout' component={asynLogout} />
          <Route path='/auth' component={asynAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    };
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckStatus()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));