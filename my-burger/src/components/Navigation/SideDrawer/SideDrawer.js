import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
	const attachedClasses = props.open ?
		[classes.SideDrawer, classes.Open]
		:
		[classes.SideDrawer, classes.Close];

	return (
		<Fragment>
			<BackDrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<Navigationitems isAuth={props.isAuth} />
				</nav>
			</div>
		</Fragment>
	);
};

export default sideDrawer;