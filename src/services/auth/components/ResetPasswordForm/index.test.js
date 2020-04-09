import React from 'react';
import { shallow } from 'enzyme';

import ResetPasswordForm from 'sly/services/auth/components/ResetPasswordForm/index';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};

const wrap = (props = {}) => shallow(<ResetPasswordForm {...defaultProps} {...props} />);

describe('ResetPasswordForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('FullWidthButton')).toHaveLength(1);
    expect(wrapper.find('LoginWithPassword')).toHaveLength(1);
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({ error });

    expect(wrapper.find('Field').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(1);
    expect(wrapper.find('Block')).toHaveLength(1);
    expect(wrapper.find('LoginWithPassword')).toHaveLength(1);
  });

  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onLoginClick', () => {
    const onLoginClick = jest.fn();
    const wrapper = wrap({ onLoginClick });

    wrapper.find('LoginWithPassword').simulate('click');
    expect(onLoginClick).toHaveBeenCalled();
  });
});
