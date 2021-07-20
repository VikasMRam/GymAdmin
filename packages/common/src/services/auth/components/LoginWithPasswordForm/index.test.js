import React from 'react';
import { shallow } from 'enzyme';

import LoginWithPasswordForm from '.';

const emailOrPhone = 'test@test.com';
const handleSubmit = jest.fn();
const passwordlessClick = jest.fn();
const defaultProps = {
  handleSubmit,
  emailOrPhone,
  passwordlessClick,
};
// const phone = '2345678901';
// const phoneFormatted = '(234) 567-8901';

const wrap = (props = {}) => shallow(<LoginWithPasswordForm {...defaultProps} {...props} />);

describe('LoginWithPasswordForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'password' })).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(2);
    expect(wrapper.find('ButtonLink')).toHaveLength(1);
  });

  // No longer applicable
  // it('renders with phone', () => {
  //   const wrapper = wrap({
  //     emailOrPhone: phone,
  //   });
  //   const otpBlock = wrapper.find('Block').at(1);

  //   expect(wrapper.find('Field').filter({ name: 'password' })).toHaveLength(1);
  //   expect(wrapper.find('Button')).toHaveLength(2);
  //   expect(otpBlock).toHaveLength(1);
  //   expect(otpBlock.contains(phoneFormatted)).toBeTruthy();
  // });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block').first();
    expect(wrapper.find('Button')).toHaveLength(2);
    expect(errors.contains(error)).toBeTruthy();
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  // No longer applicable
  // it('handles onLoginWithOtpClick', () => {
  //   const onLoginWithOtpClick = jest.fn();
  //   const wrapper = wrap({ onLoginWithOtpClick });

  //   wrapper.find('Button').at(1).simulate('click');
  //   expect(onLoginWithOtpClick).toHaveBeenCalled();
  // });
});
