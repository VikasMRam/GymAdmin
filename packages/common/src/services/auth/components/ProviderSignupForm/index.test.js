import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import ProviderSignupForm from '.';

import { Block } from 'sly/web/components/atoms';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<ProviderSignupForm {...defaultProps} {...props} />);

describe('ProviderSignupForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find(Field)).toHaveLength(4);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const error = 'Blah';
    const wrapper = wrap({ error });
    const blocks = wrapper.find(Block);

    expect(blocks).toHaveLength(1);
    expect(blocks.at(0).dive().render().text()).toBe(error);
  });

  it('handles submit', () => {
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
