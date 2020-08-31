import React from 'react';
import { shallow } from 'enzyme';

import OtpLoginForm from '.';

const emailOrPhone = 'test@test.com';
const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  emailOrPhone,
};
const phone = '2345678901';
const phoneFormatted = '(234) 567-8901';

const wrap = (props = {}) => shallow(<OtpLoginForm {...defaultProps} {...props} />);

describe('OtpLoginForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Heading').contains(emailOrPhone)).toBeTruthy();
  });

  it('renders with phone', () => {
    const wrapper = wrap({
      emailOrPhone: phone,
    });

    expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Heading').contains(phoneFormatted)).toBeTruthy();
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block');

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors.at(0).dive().render().text()).toBe(error);
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
