import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms/index';
import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';

const error = 'Blah';

const wrap = (props = {}) => shallow(<ResetPasswordForm {...props} />);

describe('ResetPasswordForm', () => {
  it('render ResetPasswordForm', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    expect(wrapper.find('StyledField').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(0);
    expect(wrapper.find('LoginLink')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, error });
    expect(wrapper.find('StyledField').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find('LoginLink')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onLoginClicked', () => {
    const handleSubmit = jest.fn();
    const onLoginClicked = jest.fn();
    const wrapper = wrap({ handleSubmit, onLoginClicked });
    wrapper.find('LoginLink').simulate('click');
    expect(onLoginClicked).toHaveBeenCalled();
  });
});
