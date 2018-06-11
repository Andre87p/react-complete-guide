import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('Should render two navigation item elements if not authenticated', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('Should render three navigation item elements if authenticated', () => {
		authenticate();
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('Should render Logout navigation item element if authenticated', () => {
		authenticate();
		expect(wrapper.contains(
			<NavigationItem link="/logout">Logout</NavigationItem>
		)).toEqual(true);
	});

	const authenticate = () => wrapper.setProps({ isAuth: true });
});