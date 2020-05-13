import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CurtainupSubscribeForm from 'sly/web/components/organisms/CurtainupSubscribeForm';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<CurtainupSubscribeForm {...defaultProps} {...props} />);

describe('CurtainupSubscribeForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('submits form', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('renders error', () => {
    const error = 'error';
    const wrapper = wrap({
      error,
    });

    expect(wrapper.find('Error').contains(error)).toBeTruthy();
  });
});
