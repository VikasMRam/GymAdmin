import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';

const similarCommunity = {
  id: 'victorian-manor',
  estimated: 1334,
  imageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/db8f52dcc7f603607d0ff91c68328b73/VM-5668_sm_sd.jpg',
  name: 'Victorian Manor',
  numReviews: 7,
  reviewsValue: 4.428571,
  startingRate: 5800,
  address: {city:'San Francisco', state:'CA'}
};

const wrap = (props = {}) =>
  shallow(<SimilarCommunityNearbyTile {...props} />);

describe('SimilarCommunityNearbyTile', () => {
  it('renders when estimated is not 0', () => {
    const wrapper = wrap({
      image: similarCommunity.imageUrl,
      name: similarCommunity.name,
      estimatedRate: similarCommunity.estimated,
      startingRate: similarCommunity.startingRate,
      reviewsValue: similarCommunity.reviewsValue,
      numReviews: similarCommunity.numReviews,
      address: similarCommunity.address,
    });
    expect(wrapper.find('ImageWrapper')).toHaveLength(1);
    expect(wrapper.find('Name')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).dive().text()).toContain('<StyledIcon />4.4');
    expect(wrapper.contains('4.4')).toBeTruthy;
  });

  it('renders when zero reviews', () => {
    const wrapper = wrap({
      image: similarCommunity.imageUrl,
      name: similarCommunity.name,
      estimatedRate: similarCommunity.estimated,
      startingRate: similarCommunity.startingRate,
      reviewsValue: similarCommunity.reviewsValue,
      address: similarCommunity.address,
      numReviews: 0,
    });
    expect(wrapper.contains('4.4')).toBeFalsy;
  });

  it('renders when rate is not provided', () => {
    const wrapper = wrap({
      image: similarCommunity.imageUrl,
      name: similarCommunity.name,
      estimatedRate: 0,
      startingRate: 0,
      reviewsValue: similarCommunity.reviewsValue,
      numReviews: similarCommunity.numReviews,
      address: similarCommunity.address,
    });
    expect(wrapper.find('ImageWrapper')).toHaveLength(1);
    expect(wrapper.find('Name')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).dive().text()).toContain('<StyledIcon />4.4');
    expect(wrapper.contains('4.4')).toBeTruthy;
  });

  it('renders when estimated is 0', () => {
    const wrapper = wrap({
      image: similarCommunity.imageUrl,
      name: similarCommunity.name,
      estimatedRate: 0,
      startingRate: similarCommunity.startingRate,
      reviewsValue: similarCommunity.reviewsValue,
      numReviews: similarCommunity.numReviews,
      address: similarCommunity.address,
    });
    expect(wrapper.find('ImageWrapper')).toHaveLength(1);
    expect(wrapper.find('Name')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).dive().text()).toContain('<StyledIcon />4.4');
    expect(wrapper.contains('4.4')).toBeTruthy;
  });

  it('renders when starting rate is 0', () => {
    const wrapper = wrap({
      image: similarCommunity.imageUrl,
      name: similarCommunity.name,
      estimatedRate: similarCommunity.estimated,
      startingRate: 0,
      reviewsValue: similarCommunity.reviewsValue,
      numReviews: similarCommunity.numReviews,
      address: similarCommunity.address,
    });
    expect(wrapper.find('ImageWrapper')).toHaveLength(1);
    expect(wrapper.find('Name')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).dive().text()).toContain('<StyledIcon />4.4');
    expect(wrapper.contains('4.4')).toBeTruthy;
  });
});
