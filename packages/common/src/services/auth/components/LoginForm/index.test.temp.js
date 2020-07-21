import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};

const wrap = (props = {}) => shallow(<LoginForm {...defaultProps} {...props} />);

describe('LoginForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Field').filter({ name: 'password' })).toHaveLength(1);
    expect(wrapper.find('PaddedFullWidthButton')).toHaveLength(1);
    expect(wrapper.find('Register')).toHaveLength(1);
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Error');

    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors.at(0).dive().render().text()).toBe(error);
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onRegisterClick', () => {
    const onRegisterClick = jest.fn();
    const wrapper = wrap({ onRegisterClick });

    wrapper.find('Link').simulate('click');
    expect(onRegisterClick).toHaveBeenCalled();
  });
});
