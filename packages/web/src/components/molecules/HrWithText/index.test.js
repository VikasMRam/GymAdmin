import React from 'react';
import { shallow } from 'enzyme';

import HrWithText from 'sly/web/components/molecules/HrWithText';

const text = 'test';
const defaultProps = {
  text,
};

const wrap = (props = {}) => shallow(<HrWithText {...defaultProps} {...props} />);

describe('HrWithText', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Hr')).toHaveLength(1);
    expect(wrapper.find('TextBlock').contains(text)).toBeTruthy();
  });

  it('renders with badge', () => {
    const wrapper = wrap({
      badgeText: text,
    });

    expect(wrapper.find('Hr')).toHaveLength(1);
    expect(wrapper.find('TextBlock').contains(text)).toBeTruthy();
    expect(wrapper.find('StyledBadge')).toHaveLength(1);
  });
});
