import React from 'react';
import { shallow } from 'enzyme';

import SignupForm from '.';

const handleSubmit = jest.fn();
const handleOtpClick = jest.fn();
const onGoogleSignUpClick = jest.fn();
const onFacebookSignUpClick = jest.fn();
const defaultProps = {
  handleSubmit,
  handleOtpClick,
  onFacebookSignUpClick,
  onGoogleSignUpClick,
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
    expect(wrapper.find('IconButton')).toHaveLength(2);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('renders without provider signup', () => {
    const wrapper = wrap({ hasProviderSignup: false });
    // const blocks = wrapper.find('Grid').find('Block');
    expect(wrapper.find('Field')).toHaveLength(5);
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


  it('handles google signup', () => {
    const onGoogleSignUpClick = jest.fn();
    const wrapper = wrap({ onGoogleSignUpClick });
    wrapper.find('IconButton').at(1).simulate('click');
    expect(onGoogleSignUpClick).toHaveBeenCalled();
  });


  it('handles facebook signup', () => {
    const onFacebookSignUpClick = jest.fn();
    const wrapper = wrap({ onFacebookSignUpClick });
    wrapper.find('IconButton').at(0).simulate('click');
    expect(onFacebookSignUpClick).toHaveBeenCalled();
  });
});
