import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import LoginOrRegisterForm from 'sly/components/organisms/LoginOrRegisterForm';
import { Block } from 'sly/components/atoms/index';

const error = 'Blah';

const wrap = (props = {}) => shallow(<LoginOrRegisterForm {...props} />);

describe('LoginOrRegisterForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, error });
    const blocks = wrapper.find(Block);

    expect(blocks).toHaveLength(2);
    expect(blocks.at(0).dive().render().text()).toBe(error);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onSignupClicked', () => {
    const handleSubmit = jest.fn();
    const onSignupClicked = jest.fn();
    const wrapper = wrap({ handleSubmit, onSignupClicked });
    wrapper.find('Signup').simulate('click');
    expect(onSignupClicked).toHaveBeenCalled();
  });
});
