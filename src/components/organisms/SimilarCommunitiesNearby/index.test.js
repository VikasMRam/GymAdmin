import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';

import SimilarCommunitiesNearby from '.';

const { similarProperties } = RhodaGoldmanPlaza;

const wrap = (props = {}) =>
  shallow(<SimilarCommunitiesNearby {...props} />);

describe('SimilarCommunitiesNearby', () => {
  it('renders when estimated is false', () => {
    const wrapper = wrap({ similarCommunities: similarProperties });
    expect(wrapper.find('StyledLink')).toHaveLength(similarProperties.length);
    expect(wrapper.find(SimilarCommunityNearbyTile)).toHaveLength(similarProperties.length);
  });

  it('renders when estimated is number', () => {
    similarProperties[0].estimated = 12;
    const wrapper = wrap({ similarCommunities: similarProperties });
    expect(wrapper.find('StyledLink')).toHaveLength(similarProperties.length);
    expect(wrapper.find(SimilarCommunityNearbyTile)).toHaveLength(similarProperties.length);
  });
});
