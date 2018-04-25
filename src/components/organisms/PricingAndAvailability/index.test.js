import React from 'react';
import { mount } from 'enzyme';

import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import RoomTile from 'sly/components/molecules/RoomTile';
import PriceBar from 'sly/components/molecules/PriceBar';

import PricingAndAvailability from '.';

const wrap = (props = {}) => mount(<PricingAndAvailability {...props} />);

const properties = {
  case1: {
    cityAverage: 0,
    estimatedAverage: 0,
    nationalAverage: 3628,
    providedAverage: 7046,
    stateAverage: 4000,
  },
  case2: {
    cityAverage: 0,
    estimatedAverage: 0,
    nationalAverage: 0,
    providedAverage: 7046,
    stateAverage: 0,
  },
  case3: {
    cityAverage: 0,
    estimatedAverage: 0,
    nationalAverage: 0,
    providedAverage: 0,
    stateAverage: 0,
  },
};
const sortedProperties = {
  case1: [
    ['cityAverage', 0],
    ['estimatedAverage', 0],
    ['nationalAverage', 3628],
    ['stateAverage', 4000],
    ['providedAverage', 7046],
  ],
  case2: [
    ['cityAverage', 0],
    ['estimatedAverage', 0],
    ['nationalAverage', 0],
    ['stateAverage', 0],
    ['providedAverage', 7046],
  ],
  case3: [
    ['cityAverage', 0],
    ['estimatedAverage', 0],
    ['nationalAverage', 0],
    ['stateAverage', 0],
    ['providedAverage', 0],
  ],
};
const expectedPropertiesLength = {
  case1: 3,
  case2: 0,
  case3: 0,
};
const communityName = 'testcommunityName';
const roomPrices = [
  {
    title: 'Beautiful, quiet private studio available now!',
    description: 'This is a lovely unfurnished apartment in a boutique style community.  Kitchenettes are provided in all of our rooms. It has a large private bathroom with a shower. It has a large closet and 300 Sq. Ft. to bring your twin or full size bed, and several other pieces that will fit nicely to furnish your new home.',
    roomType: 'Studio',
    shareType: 'Private',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Private',
    gender: 'Male or Female',
    price: 5100,
    priceType: 'Monthly Rate',
  },
  {
    title: 'Beautiful, quiet private studio available now!',
    description: 'This is a lovely unfurnished apartment in a boutique style community.  Kitchenettes are provided in all of our rooms. It has a large private bathroom with a shower. It has a large closet and 300 Sq. Ft. to bring your twin or full size bed, and several other pieces that will fit nicely to furnish your new home.',
    roomType: 'Studio',
    shareType: 'Private',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Private',
    gender: 'Male or Female',
    price: 5100,
    priceType: 'Monthly Rate',
  },
  {
    title: 'Beautiful, quiet private one bedroom available now!',
    description: 'This is a lovely unfurnished apartment in a boutique style community.  Kitchenettes are provided in all of our rooms. It has a large private bathroom with a shower.  It has 2 semi private living spaces so you can either share with a companion or have a bedroom and a living room area.  It has 2 closets  and provides 410 Sq. Ft. for you to bring up to a queen size bed, and several other pieces that will fit nicely to furnish your new home.',
    roomType: 'One Bedroom',
    shareType: 'Private',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Private',
    gender: 'Male or Female',
    price: 5700,
    priceType: 'Monthly Rate',
  },
  {
    image: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/c12040412664de0a0c9443dc952ba53b/63047_SunriseofSanMateo_SanMateo_CA_AptBed_sd.jpg',
    title: 'Private studio open in our lovely memory care neighborhood now!',
    description: 'This is a private studio that has 300 Sq. Ft. of space.  It is very bright and has a nice view in a quiet residential neighborhood.',
    roomType: 'Studio',
    shareType: 'Private',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Private',
    gender: 'Male or Female',
    price: 5070,
    priceType: 'Monthly Rate',
  },
  {
    title: 'Beautiful, quiet private studio available now!',
    description: 'This is a lovely unfurnished apartment in our boutique style community.  Kitchenettes are provided in all of our rooms. It has a large shared bathroom with a shower.  It has a shared kitchenette area and It has a private bedroom with a door to close for privacy.',
    roomType: 'Two Bedroom',
    shareType: 'Shared',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Shared',
    gender: 'Female',
    price: 5100,
    priceShared: 3900,
    priceType: 'Monthly Rate',
  },
  {
    image: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/c12040412664de0a0c9443dc952ba53b/63047_SunriseofSanMateo_SanMateo_CA_AptBed_sd.jpg',
    title: 'Shared, bright Studio Apartment with 2 windows available now!',
    description: 'This is a corner room has 325 Sq. Ft. of shared space.  The room is very bright as it has windows on 2 sides.  The bathroom will also be shared.  Roommate is very quiet and kind female.',
    roomType: 'Studio',
    shareType: 'Shared',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Shared',
    gender: 'Female',
    priceShared: 3300,
    priceType: 'Monthly Rate',
  },
];
const address = {
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
};

describe('PricingAndAvailability', () => {
  it('verify findPercentage', () => {
    expect(PricingAndAvailability.findPercentage(10, 100)).toBe(10);
    expect(PricingAndAvailability.findPercentage(55, 100)).toBe(55);
    expect(PricingAndAvailability.findPercentage(4000, 6669)).toBe(59.98);
  });

  it('verify sortProperties', () => {
    expect(PricingAndAvailability.sortProperties(properties.case1)).toEqual(sortedProperties.case1);
  });

  it('verify estimatedPrice section not shown', () => {
    const wrapper = wrap({
      communityName, roomPrices, address,
    });
    expect(wrapper.find(EstimatedCost)).toHaveLength(0);
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
  });

  it('verify roomPrices rendered without estimatedPrice', () => {
    const wrapper = wrap({
      communityName, roomPrices, address,
    });
    expect(wrapper.find(EstimatedCost)).toHaveLength(0);
    const roomTiles = wrapper.find('#pricing-and-floor-plans-price-tiles').find(RoomTile);
    expect(roomTiles).toHaveLength(roomPrices.length);
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
  });

  it('verify estimatedPrice section shown', () => {
    const wrapper = wrap({
      communityName, address, estimatedPrice: properties.case1,
    });
    expect(wrapper.find(EstimatedCost)).toHaveLength(1);
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(1);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case1);
  });

  it('verify roomPrices rendered with estimatedPrice', () => {
    const wrapper = wrap({
      communityName, roomPrices, address, estimatedPrice: properties.case1,
    });
    expect(wrapper.find(EstimatedCost)).toHaveLength(0);
    const roomTiles = wrapper.find('#pricing-and-floor-plans-price-tiles').find(RoomTile);
    expect(roomTiles).toHaveLength(roomPrices.length);
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(1);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case1);
  });

  it('verify price comparison with only providedAverage non zero ', () => {
    const wrapper = wrap({
      communityName, roomPrices, address, estimatedPrice: properties.case2,
    });
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case2);
  });

  it('verify price comparison with all properties zero ', () => {
    const wrapper = wrap({
      communityName, roomPrices, address, estimatedPrice: properties.case3,
    });
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case3);
  });
});
