import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import PriceBar from 'sly/components/molecules/PriceBar';
import { findPercentage, sortProperties } from 'sly/services/helpers/pricing';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityPricingComparison community={RhodaGoldmanPlaza} {...props} />);

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

describe('PricingAndAvailability', () => {
  it('verify findPercentage', () => {
    expect(findPercentage(10, 100)).toBe(10);
    expect(findPercentage(55, 100).toFixed(2)).toBe('55.00');
    expect(findPercentage(4000, 6669).toFixed(2)).toBe('59.98');
  });

  it('verify sortProperties', () => {
    expect(sortProperties(properties.case1)).toEqual(sortedProperties.case1);
  });

  it('verify price comparison with only providedAverage non zero ', () => {
    const wrapper = wrap({
      estimatedPrice: properties.case2,
    });
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case2);
  });

  it('verify price comparison with all properties zero ', () => {
    const wrapper = wrap({
      estimatedPrice: properties.case3,
    });
    const comparison = wrapper.find('#pricing-and-floor-plans-comparison');
    expect(comparison).toHaveLength(0);
    expect(comparison.find(PriceBar)).toHaveLength(expectedPropertiesLength.case3);
  });
});
