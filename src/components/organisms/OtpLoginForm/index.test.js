import React from 'react';
import { shallow } from 'enzyme';

import OtpLoginForm from 'sly/components/organisms/OtpLoginForm';

const emailOrPhone = 'test@test.com';
const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  emailOrPhone,
};

const wrap = (props = {}) => shallow(<OtpLoginForm {...defaultProps} {...props} />);

describe('OtpLoginForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'code' })).toHaveLength(1);
    expect(wrapper.find('FullWidthButton')).toHaveLength(1);
    expect(wrapper.find('StyledHeading').contains(emailOrPhone)).toBeTruthy();
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block');

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
});
