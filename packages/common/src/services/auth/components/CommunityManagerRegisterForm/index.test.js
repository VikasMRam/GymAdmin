import React from 'react';
import { shallow } from 'enzyme';

import CommunityManagerRegisterForm from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<CommunityManagerRegisterForm {...defaultProps} {...props} />);

describe('CommunityManagerRegisterForm|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Field').filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('IconButton')).toHaveLength(2);
    expect(wrapper.find('ButtonLink')).toHaveLength(1);
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });
    const errors = wrapper.find('Block').first();

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('IconButton')).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors.dive().contains(error)).toBeTruthy();
  });

  it('renders socialLoginError', () => {
    const socialLoginError = 'socialLoginError';
    const wrapper = wrap({ socialLoginError });
    const errors = wrapper.find('Block').first();

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('IconButton')).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors.dive().contains(socialLoginError)).toBeTruthy();
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onFacebookSigninClick', () => {
    const onFacebookSigninClick = jest.fn();
    const wrapper = wrap({ onFacebookSigninClick });

    wrapper.find('IconButton').first().simulate('click');
    expect(onFacebookSigninClick).toHaveBeenCalled();
  });

  it('handles onGoogleSigninClick', () => {
    const onGoogleSigninClick = jest.fn();
    const wrapper = wrap({ onGoogleSigninClick });

    wrapper.find('IconButton').at(1).simulate('click');
    expect(onGoogleSigninClick).toHaveBeenCalled();
  });
});
