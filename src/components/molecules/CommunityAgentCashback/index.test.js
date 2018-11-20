import React from 'react';
import { shallow } from 'enzyme';

import CommunityAgentCashback from 'sly/components/molecules/CommunityAgentCashback';

const wrap = (props = {}) =>
  shallow(<CommunityAgentCashback {...props} />);

describe('CommunityAgentCashback', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });
});
