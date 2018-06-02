import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() {
		return (
			this.props.loading ?
				<Spinner />
				:
				<div>
					{this.props.orders.map(order => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
						/>
					))}
				</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));