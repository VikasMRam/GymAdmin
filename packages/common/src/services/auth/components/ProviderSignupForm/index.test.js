import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import ProviderSignupForm from 'sly/web/services/auth/components/ProviderSignupForm';
import { Block } from 'sly/web/components/atoms/index';


const error = 'Blah';

const wrap = (props = {}) => shallow(<ProviderSignupForm {...props} />);

describe('ProviderSignupForm', () => {
  it('render ProviderSignupForm', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    expect(wrapper.find(Field)).toHaveLength(4);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, error });
    const blocks = wrapper.find(Block);

    expect(blocks).toHaveLength(1);
    expect(blocks.at(0).dive().render().text()).toBe(error);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('handles onLoginClicked', () => {
    const handleSubmit = jest.fn();
    const onLoginClicked = jest.fn();
    const wrapper = wrap({ handleSubmit, onLoginClicked });
    wrapper.find('Link').simulate('click');
    expect(onLoginClicked).toHaveBeenCalled();
  });
});
