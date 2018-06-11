import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncLogout = asyncComponent(() => import('./containers/Auth/Logout/Logout'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        const routes = this.props.isAuthenticated ?
            (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={asyncLogout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
            :
            (
                <Switch>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );

        return <div><Layout>{routes}</Layout></div>;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));