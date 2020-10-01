import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '.';

const totalSteps = 5;
const defaultProps = {
  totalSteps,
};
const wrap = (props = {}) => shallow(<ProgressBar {...defaultProps} {...props} />);

describe('ProgressBar', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Block[data-testid="Bar"]')).toHaveLength(1);
  });

  it('renders with label', () => {
    const wrapper = wrap({
      label: true,
    });

    expect(wrapper.find('Block[data-testid="Bar"]')).toHaveLength(1);
    expect(wrapper.find('Block[data-testid="Label"]').text()).toBe(`1 OF ${totalSteps}`);
  });
});
