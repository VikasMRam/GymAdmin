import React from 'react';
import { shallow } from 'enzyme';

import HrWithText from '.';

const text = 'test';
const defaultProps = {
  children: text,
};

const wrap = (props = {}) => shallow(<HrWithText {...defaultProps} {...props} />);

describe('HrWithText|Web', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Hr')).toHaveLength(1);
    expect(wrapper.find('StyledBlock').contains(text)).toBeTruthy();
  });

  it('renders with badge', () => {
    const wrapper = wrap({
      badgeText: text,
    });

    expect(wrapper.find('Hr')).toHaveLength(1);
    expect(wrapper.find('StyledBlock').contains(text)).toBeTruthy();
    expect(wrapper.find('Badge')).toHaveLength(1);
  });
});
