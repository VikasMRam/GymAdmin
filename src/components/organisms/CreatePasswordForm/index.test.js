import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CreatePasswordForm from 'sly/components/organisms/CreatePasswordForm';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<CreatePasswordForm {...defaultProps} {...props} />);

describe('CreatePasswordForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find(Field).filter({ name: 'password' })).toHaveLength(1);
    expect(wrapper.find('LargePaddedFullWidthButton')).toHaveLength(1);
  });

  it('submits form', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
