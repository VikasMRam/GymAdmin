import React from 'react';
import { mount } from 'enzyme';
import numeral from 'numeral';

import PricingAndAvailability from '.';

const wrap = (props = {}) => mount(<PricingAndAvailability {...props} />);

const properties = {
  cityAverage: 0,
  estimatedAverage: 0,
  nationalAverage: 3628,
  providedAverage: 7046,
  stateAverage: 4000,
};
const sortedProperties = [
  ['cityAverage', 0],
  ['estimatedAverage', 0],
  ['nationalAverage', 3628],
  ['stateAverage', 4000],
  ['providedAverage', 7046],
];
const propertyName = 'testPropertyName';
const priceTypeMap = {
  'Monthly Rate': 'month',
};
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
    expect(PricingAndAvailability.sortProperties(properties)).toEqual(sortedProperties);
  });

  it('verify estimatedPrice section not shown', () => {
    const wrapper = wrap({
      propertyName, roomPrices, address,
    });
    expect(wrapper.find('article')).toHaveLength(1);
  });

  it('verify roomPrices rendered without estimatedPrice', () => {
    const wrapper = wrap({
      propertyName, roomPrices, address,
    });
    const children = wrapper.find('article').children();
    expect(children).toHaveLength(roomPrices.length);
    children.forEach((node, i) => {
      const currentRoomPrice = roomPrices[i];
      const priceToShow = currentRoomPrice.shareType === 'Shared' ? currentRoomPrice.priceShared : currentRoomPrice.price;
      expect(node.text()).toBe(`Inquire or book a tour${currentRoomPrice.roomType} ${currentRoomPrice.shareType}$${numeral(priceToShow).format('0,0')} per ${priceTypeMap[currentRoomPrice.priceType]}`);
    });
  });

  it('verify estimatedPrice section shown', () => {
    const wrapper = wrap({
      propertyName, roomPrices, address, estimatedPrice: properties,
    });
    expect(wrapper.find('article')).toHaveLength(2);
    expect(wrapper.find('article').at(1).text()).toContain('Compare to Local Assisted Living Costs');
  });

  it('verify roomPrices rendered with estimatedPrice', () => {
    const wrapper = wrap({
      propertyName, roomPrices, address, estimatedPrice: properties,
    });
    const children = wrapper.find('article').at(0).children();
    expect(children).toHaveLength(roomPrices.length);
    children.forEach((node, i) => {
      const currentRoomPrice = roomPrices[i];
      const priceToShow = currentRoomPrice.shareType === 'Shared' ? currentRoomPrice.priceShared : currentRoomPrice.price;
      expect(node.text()).toBe(`Inquire or book a tour${currentRoomPrice.roomType} ${currentRoomPrice.shareType}$${numeral(priceToShow).format('0,0')} per ${priceTypeMap[currentRoomPrice.priceType]}`);
    });
  });

  it('verify estimatedCost section shown', () => {
    const wrapper = wrap({
      propertyName, address, estimatedPrice: properties,
    });
    expect(wrapper.find('article').at(0).text()).toContain(`*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area, and the amenities and care services provided at ${propertyName}`);
  });
});
