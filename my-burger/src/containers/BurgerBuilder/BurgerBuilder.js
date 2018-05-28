import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ings)
            .map(igKey => this.props.ings[igKey])
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purchaseHandler = (value) => {
        this.setState({ purchasing: value });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            this.props.ings ?
                <Fragment>
                    <Modal
                        show={this.state.purchasing}
                        modalClosed={() => this.purchaseHandler(false)}
                    >
                        {
                            this.state.loading ?
                                <Spinner />
                                :
                                <OrderSummary
                                    ingredients={this.props.ings}
                                    purchaseCanceled={() => this.purchaseHandler(false)}
                                    purchaseContinued={this.purchaseContinueHandler}
                                    price={this.props.price}
                                />
                        }
                    </Modal>

                    <Burger ingredients={this.props.ings} />

                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState()}
                        ordered={() => this.purchaseHandler(true)}
                        price={this.props.price}
                    />
                </Fragment>
                :
                <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));