import React from 'react';
import { shallow } from 'enzyme';

import SignupForm from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<SignupForm {...defaultProps} {...props} />);

describe('SignupForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field')).toHaveLength(5);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('renders without provider signup', () => {
    const wrapper = wrap({ hasProviderSignup: false });
    const blocks = wrapper.find('Grid').find('Block');

    expect(blocks).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const error = 'Blah';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block').at(1);

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(errors.contains(error)).toBeTruthy();
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
