import React from 'react';
import { shallow } from 'enzyme';

import Intro from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  showSkipOption: true,
};
const wrap = (props = {}) => shallow(<Intro {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Intro', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Field').filter({ type: 'button' })).toHaveLength(2);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
