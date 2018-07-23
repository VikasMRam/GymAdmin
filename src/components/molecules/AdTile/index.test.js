import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import AdTile, { StyledIcon } from '.';

const defaultProps = {
  title: 'Let the Seniorly Team Find Your Room',
  items: [
    { index: 0, text: 'Get Special Pricing' },
    { index: 1, text: 'Access to communities not yet listed' },
    { index: 2, text: 'Concierge team ready to assist' },
  ],
  buttonText: 'Request Consultation',
};

const wrap = (props = {}) =>
  shallow(<AdTile {...defaultProps} {...props} />);

describe('AdTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders AdTile', () => {
    const wrapper = wrap();
    expect(wrapper.find('li')).toHaveLength(3);
    expect(wrapper.find(StyledIcon)).toHaveLength(1);
  });

  it('handles Click event', () => {
    const onClick = spy();
    const wrapper = wrap({ onClick });
    wrapper.simulate('click');
    expect(onClick.getCalls()).toHaveLength(1);
  });
});
