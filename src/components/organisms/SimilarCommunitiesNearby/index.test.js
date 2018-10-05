import React from 'react';
import { shallow } from 'enzyme';

import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';

import SimilarCommunitiesNearby from '.';

const similarCommunities = [
  {
    id: 'victorian-manor',
    estimated: false,
    imageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/db8f52dcc7f603607d0ff91c68328b73/VM-5668_sm_sd.jpg',
    name: 'Victorian Manor',
    numReviews: 7,
    reviewsValue: 4.428571,
    startingRate: 3950,
    url: '/assisted-living/california/san-francisco/victorian-manor',
  },
  {
    id: 'agesong-laguna-grove-care',
    estimated: false,
    imageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/611f19f5754d9debbc6c7e16a64ba2d0/AgeSong_Laguna_Grove_Care_new-2_sd.jpg',
    name: 'AgeSong Laguna Grove Care',
    numReviews: 9,
    reviewsValue: 4,
    startingRate: 5800,
    url: '/assisted-living/california/san-francisco/agesong-laguna-grove-care',
  },
];

const wrap = (props = {}) =>
  shallow(<SimilarCommunitiesNearby {...props} />);

describe('SimilarCommunitiesNearby', () => {
  it('renders when estimated is false', () => {
    const wrapper = wrap({ similarCommunities });
    expect(wrapper.find('StyledLink')).toHaveLength(similarCommunities.length);
    expect(wrapper.find(SimilarCommunityNearbyTile)).toHaveLength(similarCommunities.length);
  });

  it('renders when estimated is number', () => {
    similarCommunities[0].estimated = 12;
    const wrapper = wrap({ similarCommunities });
    expect(wrapper.find('StyledLink')).toHaveLength(similarCommunities.length);
    expect(wrapper.find(SimilarCommunityNearbyTile)).toHaveLength(similarCommunities.length);
  });
});
