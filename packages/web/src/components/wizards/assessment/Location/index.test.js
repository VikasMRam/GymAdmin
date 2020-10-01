import React from 'react';
import { shallow } from 'enzyme';

import Location from '.';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<Location {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Location', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading').contains('Where are you looking for care?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'locationSearch' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('Heading').contains('Where are you looking for care?')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'locationSearch' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(0);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
