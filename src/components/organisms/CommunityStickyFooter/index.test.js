import React from 'react';
import { shallow } from 'enzyme';

import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import CommunityActions from 'sly/components/molecules/CommunityActions';

const wrap = (props = {}) =>
  shallow(<CommunityStickyFooter {...props} />);

describe('StickyFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find(CommunityActions)).toHaveLength(1);
  });
});
