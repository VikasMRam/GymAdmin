import React from 'react';
import { mount } from 'enzyme';

import { Heading } from 'sly/components/atoms';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import AmenitiesAndFeatures from '.';

const wrap = (props = {}) => mount(<AmenitiesAndFeatures {...props} />);

const { name, propInfo } = RhodaGoldmanPlaza;
let {
  communityHighlights, personalSpace, personalSpaceOther, communitySpace, communitySpaceOther,
  nonCareServices, nonCareServicesOther, languages, languagesOther,
} = propInfo;
communityHighlights = communityHighlights || [];
personalSpace = personalSpace || [];
personalSpaceOther = personalSpaceOther || [];
communitySpace = communitySpace || [];
communitySpaceOther = communitySpaceOther || [];
nonCareServices = nonCareServices || [];
nonCareServicesOther = nonCareServicesOther || [];
languages = languages || [];
languagesOther = languagesOther || [];


describe('AmenitiesAndFeatures', () => {
  it('verify no info message shown', () => {
    const wrapper = wrap({
      propertyName: name,
    });
    expect(wrapper.text()).toContain('No information about amenities and features currently available');
  });

  it('verify communityHighlights shown', () => {
    const wrapper = wrap({
      propertyName: name,
      communityHighlights,
    });
    const articleElem = wrapper.find('#amenities-and-features-known-for');

    expect(articleElem.find(Heading).text()).toContain(`${name} is known for`);
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(communityHighlights.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(communityHighlights[i]);
    });
  });

  it('verify personalSpace shown', () => {
    const wrapper = wrap({
      propertyName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
    });
    const allPersonalSpace = personalSpace.concat(personalSpaceOther);

    const articleElem = wrapper.find('#amenities-and-features-personal-space');
    expect(articleElem.find(Heading).text()).toContain('Personal Space/Amenities');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(allPersonalSpace.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(allPersonalSpace[i]);
    });
  });

  it('verify communitySpace shown', () => {
    const wrapper = wrap({
      propertyName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
    });
    const allCommunitySpace = communitySpace.concat(communitySpaceOther);

    const articleElem = wrapper.find('#amenities-and-features-community-space');
    expect(articleElem.find(Heading).text()).toContain('Community Space/Neighborhood');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(allCommunitySpace.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(allCommunitySpace[i]);
    });
  });

  it('verify nonCareServices shown', () => {
    const wrapper = wrap({
      propertyName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
      nonCareServices,
      nonCareServicesOther,
    });
    const allNonCareServices = nonCareServices.concat(nonCareServicesOther);

    const articleElem = wrapper.find('#amenities-and-features-noncare-services');
    expect(articleElem.find(Heading).text()).toContain('Activities & other services');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(allNonCareServices.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(allNonCareServices[i]);
    });
  });

  it('verify languages shown', () => {
    const wrapper = wrap({
      propertyName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
      nonCareServices,
      nonCareServicesOther,
      languages,
      languagesOther,
    });
    const allLanguages = languages.concat(languagesOther);

    const articleElem = wrapper.find('#amenities-and-features-languages');
    expect(articleElem.find(Heading).text()).toContain('Resident Languages');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(allLanguages.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(allLanguages[i]);
    });
  });
});
