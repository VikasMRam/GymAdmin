import React from 'react';
import { shallow } from 'enzyme';

import CommunityTile from 'sly/components/organisms/CommunityTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityTile community={RhodaGoldmanPlaza} {...props} />);

describe('CommunityTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunityTile - Mobile Layout', () => {
    const wrapper = wrap().dive();
    expect(wrapper.find('StyledCommunityInfo')).toHaveLength(1);
  });

  it('renders CommunityTile - Contained Layout', () => {
    const wrapper = wrap({ layout: 'contained' }).dive();
    expect(wrapper.find('StyledCommunityInfo')).toHaveLength(1);
  });
});
