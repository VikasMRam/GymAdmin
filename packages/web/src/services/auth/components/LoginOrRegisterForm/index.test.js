import React from 'react';
import { shallow } from 'enzyme';

import LoginOrRegisterForm from 'sly/web/services/auth/components/LoginOrRegisterForm/index';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};

const wrap = (props = {}) => shallow(<LoginOrRegisterForm {...defaultProps} {...props} />);

describe('LoginOrRegisterForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'emailOrPhone' })).toHaveLength(1);
    expect(wrapper.find('FullWidthButton')).toHaveLength(1);
    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(2);
    expect(wrapper.find('LoginWithPassword')).toHaveLength(2);
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Error');

    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(3);
    expect(errors).toHaveLength(1);
    expect(errors.at(0).dive().render().text()).toBe(error);
  });

  it('renders socialLoginError', () => {
    const socialLoginError = 'socialLoginError';
    const wrapper = wrap({ socialLoginError });
    const errors = wrapper.find('SocialLoginError');

    expect(wrapper.find('FullWidthButton')).toHaveLength(1);
    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors.at(0).dive().render().text()).toBe(socialLoginError);
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onFacebookSigninClick', () => {
    const onFacebookSigninClick = jest.fn();
    const wrapper = wrap({ onFacebookSigninClick });

    wrapper.find('LargePaddedFullWidthButton').at(0).simulate('click');
    expect(onFacebookSigninClick).toHaveBeenCalled();
  });
});
