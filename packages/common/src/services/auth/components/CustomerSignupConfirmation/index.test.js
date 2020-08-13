import React from 'react';
import { shallow } from 'enzyme';

import CustomerSignupConfirmation from '.';

import AmalFrancis from 'sly/storybook/sample-data/user-amal-francis.json';

const onSubmit = jest.fn();
const defaultProps = {
  onSubmit,
  user: AmalFrancis,
};
const wrap = (props = {}) => shallow(<CustomerSignupConfirmation {...defaultProps} {...props} />);

describe('CustomerSignupConfirmation|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Paragraph')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('handles submit', () => {
    const onSubmit = jest.fn();
    const wrapper = wrap({ onSubmit });

    wrapper.find('Button').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });
});
