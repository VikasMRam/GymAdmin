import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms/index';
import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';

const handleSubmit = jest.fn();
const onLoginClicked = jest.fn();

const error = 'Blah';

const wrap = (props = {}) => shallow(<ResetPasswordForm handleSubmit={handleSubmit} onLoginClicked={onLoginClicked} {...props} />);

describe('ResetPasswordForm', () => {
  it('render ResetPasswordForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('Styled(Field)').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Styled(Button)')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(0);
    expect(wrapper.find('LoginLink')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find('Styled(Field)').filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Styled(Button)')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find('LoginLink')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const wrapper = wrap({ });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onLoginClicked', () => {
    const wrapper = wrap({ });
    wrapper.find('LoginLink').simulate('click');
    expect(onLoginClicked).toHaveBeenCalled();
  });
});
