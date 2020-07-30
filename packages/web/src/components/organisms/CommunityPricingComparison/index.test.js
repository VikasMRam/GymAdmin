import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricingComparison from 'sly/web/components/organisms/CommunityPricingComparison';
import { findPercentage, sortProperties } from 'sly/web/services/helpers/pricing';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityPricingComparison community={RhodaGoldmanPlaza} {...props} />);

const properties = {
  case1: {
    cityAverage: 0,
    estimatedAverage: 0,
    nationalAverage: 3628,
    providedAverage: 7046,
    stateAverage: 4000,
    homeCareMAverage: 4500,
    adultDayAverage: 3000,
  },
  case2: {
    estimatedAverage: 0,
    cityAverage:4000,
    nationalAverage: 4500,
    providedAverage: 7046,
    stateAverage: 4200,
    homeCareMAverage: 4500,
    adultDayAverage: 3000,
},
  case3: {
    cityAverage: 0,
    estimatedAverage: 0,
    nationalAverage: 0,
    providedAverage: 0,
    stateAverage: 0,
    homeCareMAverage: 0,
    adultDayAverage: 0,
  },
};

const sortedProperties = {
  case1: [
    ['cityAverage', 0],
    ['estimatedAverage', 0],
    ['nationalAverage', 3628],
    ['providedAverage', 7046],
    ['stateAverage', 4000],
    ['homeCareMAverage', 4500],
    ['adultDayAverage', 3000],
  ],
  case2: [
    ['estimatedAverage', 0],
    ['cityAverage', 4000],
    ['nationalAverage', 4500],
    ['providedAverage', 7046],
    ['stateAverage', 4200],
    ['homeCareMAverage', 4500],
    ['adultDayAverage', 3000],
  ],
  case3: [
    ['cityAverage', 0],
    ['estimatedAverage', 0],
    ['nationalAverage', 0],
    ['providedAverage', 0],
    ['stateAverage', 0],
    ['homeCareMAverage', 0],
    ['adultDayAverage', 0],
  ],
};

const expectedPropertiesLength = {
  case1: 4,
  case2: 4,
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
    expect(sortProperties(properties.case2)).toEqual(sortedProperties.case2);
    expect(sortProperties(properties.case3)).toEqual(sortedProperties.case3);
  });

  it('verify price comparison with only providedAverage non zero ', () => {
    const community = { ...RhodaGoldmanPlaza };
    community.rgsAux.estimatedPrice = properties.case2;
    const wrapper = wrap({
      community,
    });
    const priceBars = wrapper.find('StyledNumberFormat');
    expect(priceBars).toHaveLength(expectedPropertiesLength.case2);
  });

  it('verify price comparison with all properties zero ', () => {
    const community = { ...RhodaGoldmanPlaza };
    community.rgsAux.estimatedPrice = properties.case3;
    const wrapper = wrap({
      community,
    });
    const priceBars = wrapper.find('StyledNumberFormat');
    expect(priceBars).toHaveLength(expectedPropertiesLength.case3);
  });
});
