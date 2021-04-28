import React from 'react';
import { shallow } from 'enzyme';

import OtpLoginForm from '.';

const formState = {
  email: 'test@test.com',
};
const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  formState,
};
// const phone = '2345678901';
// const phoneFormatted = '(234) 567-8901';

const wrap = (props = {}) => shallow(<OtpLoginForm {...defaultProps} {...props} />);

describe('OtpLoginForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Button').contains('Send Code')).toBeTruthy();
  });

  it('on send code click form change to passcode login', () => {
    const wrapper = wrap({ sentCode: true });
    expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
    expect(wrapper.find('Button').contains('Log in')).toBeTruthy();
    expect(wrapper.find('Heading').contains(formState.email)).toBeTruthy();
  });

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
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block');
    console.log(wrapper.debug());
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(errors).toHaveLength(2);
    expect(errors.at(1).dive().render().text()).toBe(error);
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
