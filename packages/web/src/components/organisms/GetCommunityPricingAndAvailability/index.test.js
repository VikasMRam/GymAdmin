import React from 'react';
import { shallow } from 'enzyme';

import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const defaultProps = {
  community: RhodaGoldmanPlaza,
};

const wrap = (props = {}) => shallow(<GetCommunityPricingAndAvailability {...defaultProps} {...props} />);

describe('GetCommunityPricingAndAvailability', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();

    expect(wrapper.contains('test')).toBeFalsy();
  });

  // it('renders', () => {
  //   const wrapper = wrap();
  //   const pricingComponent = wrapper.find('PaddedCommunityPricing');
  //   const ratingComponent = wrapper.find('PaddedCommunityRating');
  //
  //   expect(pricingComponent).toHaveLength(1);
  //   expect(pricingComponent.prop('price')).toBe(defaultProps.community.startingRate);
  //   expect(ratingComponent).toHaveLength(1);
  //   expect(ratingComponent.prop('rating')).toBe(defaultProps.community.propRatings.reviewsValue);
  //   expect(ratingComponent.prop('numReviews')).toBe(defaultProps.community.propRatings.numReviews);
  //   expect(wrapper.contains('Get Detailed Pricing')).toBeTruthy();
  // });
  //
  // it('renders without startingRate', () => {
  //   const community = { ...RhodaGoldmanPlaza };
  //   community.startingRate = 0;
  //   const wrapper = wrap({
  //     community,
  //   });
  //
  //   expect(wrapper.find('PaddedCommunityPricing')).toHaveLength(0);
  //   expect(wrapper.find('PaddedCommunityRating')).toHaveLength(1);
  //   expect(wrapper.contains('Get Detailed Pricing')).toBeTruthy();
  // });
});
