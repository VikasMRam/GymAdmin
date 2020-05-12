import React from 'react';
import { shallow } from 'enzyme';

import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';
import CommunityActions from 'sly/web/components/molecules/CommunityActions';

jest.mock('sly/web/containers/AskAgentQuestionContainer');

const wrap = (props = {}) =>
  shallow(<CommunityStickyFooter {...props} />);

describe('StickyFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find(CommunityActions)).toHaveLength(1);
  });
});
