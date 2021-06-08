import React from 'react';
import { shallow } from 'enzyme';

import Conversion from '.';

const handleSubmit = jest.fn();
const change = jest.fn();
const onConversionSuccess = jest.fn();
const whoNeedsHelp = 'parents';
const heading = 'Sign up for seniorly and make your senior living search easier';
const description = 'Sign up for seniorly and make your senior living search easier';
const submitButtonText = 'Sign up';
const defaultProps = {
  onConversionSuccess,
  heading,
  description,
  submitButtonText,
  handleSubmit,
  whoNeedsHelp,
  change,
};
const wrap = (props = {}) => shallow(<Conversion {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Conversion', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading').contains('Which activities does your parent(s) need help with?')).toBeTruthy();
    expect(wrapper.find('Block').at(0).contains(description)).toBeTruthy();
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('Heading').contains('Which activities does your parent(s) need help with?')).toBeTruthy();
    expect(wrapper.find('Block').at(0).contains(description)).toBeTruthy();
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
