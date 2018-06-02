import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => dispatch(purchaseBurgerFail(error)));
	};
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('/orders.json')
			.then(res => {
				const fetchOrders = [];
				for (let key in res.data) {
					fetchOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchOrders))
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error))
			});
	};
}

const purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START });
const purchaseBurgerSuccess = (id, orderData) => (
	{
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
);
const purchaseBurgerFail = (error) => (
	{
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
);

const fetchOrdersSuccess = (orders) => (
	{
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
);
const fetchOrdersStart = () => ({ type: actionTypes.FETCH_ORDERS_START });
const fetchOrdersFail = () => ({ type: actionTypes.FETCH_ORDERS_FAIL });