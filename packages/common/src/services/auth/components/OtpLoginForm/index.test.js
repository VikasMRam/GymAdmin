import React from 'react';
import { mount } from 'enzyme';

import OtpLoginForm from '.';

const formState = {
  phone_number: '555-555-5555',
};
const onSubmit = jest.fn();
const onEditPhoneNumberClick = jest.fn();
const onPasswordLoginClick = jest.fn();
const defaultProps = {
  onSubmit,
  onEditPhoneNumberClick,
  onPasswordLoginClick,
  formState,
};
// const phone = '2345678901';
// const phoneFormatted = '(234) 567-8901';

const wrap = (props = {}) => mount(<OtpLoginForm {...defaultProps} {...props} />);

describe('OtpLoginForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('InputCode')).toHaveLength(1);
    expect(wrapper.find('ButtonLink').at(1).contains(' Resend')).toBeTruthy();
  });


  // Not applicable
  // it('on send code click form change to passcode login', () => {
  //   const wrapper = wrap({ sentCode: true });
  //   expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
  //   expect(wrapper.find('Button').contains('Log in')).toBeTruthy();
  //   expect(wrapper.find('Heading').contains(formState.email)).toBeTruthy();
  // });

  // Not supporting phone so this test should not be run
  // it('renders with phone', () => {
  //   const wrapper = wrap({
  //     emailOrPhone: phone,
  //   });

  //   expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
  //   expect(wrapper.find('Button')).toHaveLength(1);
  //   expect(wrapper.find('Heading').contains(phoneFormatted)).toBeTruthy();
  // });

  it('renders error', () => {
    const submitError = 'error';
    const wrapper = wrap({ submitError });
    const errors = wrapper.find('Block');
    expect(wrapper.find('Button')).toHaveLength(0);
    expect(errors.contains(submitError)).toBeTruthy();
  });

  it('handles submit', () => {
    const onSubmit = jest.fn();
    const wrapper = wrap({ onSubmit });
    wrapper.find('Input').at(0).simulate('change', { target: { value: 1 } });
    wrapper.find('Input').at(1).simulate('change', { target: { value: 1 } });
    wrapper.find('Input').at(2).simulate('change', { target: { value: 1 } });
    wrapper.find('Input').at(3).simulate('change', { target: { value: 1 } });
    wrapper.find('Input').at(4).simulate('change', { target: { value: 1 } });
    wrapper.find('Input').at(5).simulate('change', { target: { value: 1 } });

    expect(onSubmit).toHaveBeenCalled();
  });
});
