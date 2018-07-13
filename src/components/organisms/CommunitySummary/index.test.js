import React from 'react';
import { mount } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunitySummary from '.';
import { Link } from 'sly/components/atoms';
import ListItem from 'sly/components/molecules/ListItem';

const {
  propInfo,
  propRatings,
  startingRate,
  rgsAux,
  twilioNumber,
  user,
  reviews,
} = RhodaGoldmanPlaza;
const {
  communityHighlights,
  communityPhone,
} = propInfo;
const {
  reviewsValue
} = propRatings

const communityReviewsRef = React.createRef();
const pricingAndFloorPlansRef = React.createRef();
const amenitiesAndFeaturesRef = React.createRef();

const wrap = (props = {}) => mount(<CommunitySummary {...props} />);

// const testTwilioNumber = (wrapper) => {
//   expect(wrapper.find(ListItem).find(Link).find({ href: `tel:${twilioNumber.numbers[0]}` }).length).toBeGreaterThan(0);
//   expect(wrapper.text()).toContain('Pricing & Availability');
// };
// const testPhoneNumber = (wrapper) => {
//   expect(wrapper.find(ListItem).find(Link).find({ href: `tel:${communityPhone}` }).length).toBeGreaterThan(0);
//   expect(wrapper.text()).toContain('Reception');
// };
// const testUserPhoneNumber = (wrapper) => {
//   expect(wrapper.find(ListItem).find(Link).find({ href: `tel:${user.phoneNumber}` }).length).toBeGreaterThan(0);
//   expect(wrapper.text()).toContain('Reception');
// };
const testAmenityScore = (wrapper) => {
  expect(wrapper.find(ListItem).find(Link).find({ href: `#${CommunitySummary.sectionIdMaps.amenitiesAndFeatures}` }).length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain('Amenity Score');
};
const testStartingRate = (wrapper) => {
  expect(wrapper.find(ListItem).find(Link).find({ href: `#${CommunitySummary.sectionIdMaps.pricingAndFloorPlans}` }).length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain('Pricing starts from');
};
const testCommunityHighlights = (wrapper) => {
  expect(wrapper.find(ListItem).find(Link).find({ href: `#${CommunitySummary.sectionIdMaps.amenitiesAndFeatures}` }).length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain("Alzheimer's & Dementia support");
};
const testReviews = (wrapper) => {
  expect(wrapper.find(ListItem).find(Link).find({ href: `#${CommunitySummary.sectionIdMaps.reviews}` }).length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain('Rating 4.1-Star Average');
};

// it('renders twilioNumber', () => {
//   const wrapper = wrap({
//     twilioNumber, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
//   });
//   testTwilioNumber(wrapper);
// });
//
// it('renders phoneNumber', () => {
//   const wrapper = wrap({
//     phoneNumber:communityPhone, user, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
//   });
//   testPhoneNumber(wrapper);
// });
//
// it('renders user phone number', () => {
//   const wrapper = wrap({
//     user, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
//   });
//   testUserPhoneNumber(wrapper);
// });

it('renders amenityScore', () => {
  const wrapper = wrap({
    amenityScore: rgsAux.amenityScore, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
  });
  testAmenityScore(wrapper);
});

it('renders startingRate', () => {
  const wrapper = wrap({
    startingRate, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef, providedAverage: 1,
  });
  testStartingRate(wrapper);
});

it('renders communityHighlights', () => {
  const wrapper = wrap({
    communityHighlights, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
  });
  testCommunityHighlights(wrapper);
});

it('renders reviews', () => {
  const wrapper = wrap({
    reviewsValue, communityReviewsRef, pricingAndFloorPlansRef, amenitiesAndFeaturesRef,
  });
  testReviews(wrapper);
});

it('renders all properties', () => {
  const wrapper = wrap({
    twilioNumber,
    phoneNumber: communityPhone,
    user,
    amenityScore: rgsAux.amenityScore,
    startingRate,
    communityHighlights,
    reviewsValue,
    communityReviewsRef,
    pricingAndFloorPlansRef,
    amenitiesAndFeaturesRef,
    providedAverage: 1,
  });

  // testTwilioNumber(wrapper);
  // testPhoneNumber(wrapper);
  // testUserPhoneNumber(wrapper);
  testAmenityScore(wrapper);
  testStartingRate(wrapper);
  testCommunityHighlights(wrapper);
  testReviews(wrapper);
});
