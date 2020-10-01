import React from 'react';
import { shallow } from 'enzyme';

import Services from '.';

const handleSubmit = jest.fn();
const whoNeedsHelp = 'parents';
const defaultProps = {
  handleSubmit,
  whoNeedsHelp,
};
const wrap = (props = {}) => shallow(<Services {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|Services', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Heading').contains('Please tell us if you are interested in these other services:')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(1);
  });

  it('renders without tip', () => {
    const wrapper = wrap({
      hasTip: false,
    });

    expect(wrapper.find('Heading').contains('Please tell us if you are interested in these other services:')).toBeTruthy();
    expect(wrapper.find('Field').filter({ type: 'boxChoice' })).toHaveLength(1);
    expect(wrapper.find('TipBox')).toHaveLength(0);
  });

  it('handles submit', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
