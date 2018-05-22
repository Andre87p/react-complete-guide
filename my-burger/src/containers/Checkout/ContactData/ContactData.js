import React, { Component } from 'react';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: 'Andrea Perinu',
		address: {
			street: 'Test street 1',
			zipCode: '47150',
			country: 'Italy'
		},
		email: 'prova@lulz.com',
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Andrea Perinu',
				address: {
					street: 'Test street 1',
					zipCode: '47150',
					country: 'Italy'
				},
				email: 'prova@lulz.com'
			},
			deliveryMethod: 'fastest'

		};
		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false })
				this.props.history.push('/');
			})
			.catch(error => this.setState({ loading: false }));
	}

	render() {
		return (
			this.state.loading ?
				<Spinner />
				:
				<div className={classes.ContactData}>
					<h4>Enter your contact data</h4>
					<form className={classes.Form}>
						<input
							className={classes.Input} type="text"
							name="name" placeholder="Your Name"
						/>
						<input
							className={classes.Input} type="email"
							name="email" placeholder="Your Email"
						/>
						<input
							className={classes.Input} type="text"
							name="street" placeholder="Street"
						/>
						<input
							className={classes.Input} type="text"
							name="postal" placeholder="Postal Code"
						/>
						<Button
							type="Success"
							clicked={this.orderHandler}
						>ORDER</Button>
					</form>
				</div>
		);
	}
}

export default ContactData;