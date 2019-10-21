import React from 'react';
import { shallow } from 'enzyme';
import PageButtons from '../components/posts/PageButtons';

describe('<PageButtons />', () => {
  it('renders two buttons', () => {
    const wrapper = shallow(<PageButtons />);
		expect(wrapper.find('button').at(0).text().includes('Previous')).toBe(true);
		expect(wrapper.find('button').at(1).text().includes('Next')).toBe(true);
	})
});