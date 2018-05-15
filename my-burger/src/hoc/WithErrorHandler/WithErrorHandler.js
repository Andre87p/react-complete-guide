import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = { error: null };

		componentDidMount() {
			axios.interceptors.request.use(req => {
				this.setState({ error: null });
			});

			axios.interceptors.response.use(null, erro => {
				this.setState({ error: error });
			});
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Fragment>
					<Modal
						show={this.state.error}
						clicked={}
					>
						{this.state.error.message}
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			);
		}
	}
};

export default withErrorHandler;