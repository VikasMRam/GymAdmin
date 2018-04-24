import React from 'react';
import { mount } from 'enzyme';

import { Heading, Paragraph } from 'sly/components/atoms';

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
communitySpace = communitySpace || [];
nonCareServices = nonCareServices || [];
languages = languages || [];


describe('AmenitiesAndFeatures', () => {
  it('verify no info message shown', () => {
    const wrapper = wrap({
      communityName: name,
    });
    expect(wrapper.text()).toContain('No information about amenities and features currently available');
  });

  it('verify communityHighlights shown', () => {
    const wrapper = wrap({
      communityName: name,
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
      communityName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
    });

    const articleElem = wrapper.find('#amenities-and-features-personal-space');
    expect(articleElem.find(Heading).text()).toContain('Personal Space/Amenities');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(personalSpace.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(personalSpace[i]);
    });
    if (personalSpaceOther) {
      expect(articleElem.find(Paragraph).text()).toContain(personalSpaceOther);
    } else {
      expect(articleElem.find(Paragraph)).toHaveLength(0);
    }
  });

  it('verify communitySpace shown', () => {
    const wrapper = wrap({
      communityName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
    });

    const articleElem = wrapper.find('#amenities-and-features-community-space');
    expect(articleElem.find(Heading).text()).toContain('Community Space/Neighborhood');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(communitySpace.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(communitySpace[i]);
    });
    if (communitySpaceOther) {
      expect(articleElem.find(Paragraph).text()).toContain(communitySpaceOther);
    } else {
      expect(articleElem.find(Paragraph)).toHaveLength(0);
    }
  });

  it('verify nonCareServices shown', () => {
    const wrapper = wrap({
      communityName: name,
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
      nonCareServices,
      nonCareServicesOther,
    });

    const articleElem = wrapper.find('#amenities-and-features-noncare-services');
    expect(articleElem.find(Heading).text()).toContain('Activities & other services');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(nonCareServices.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(nonCareServices[i]);
    });
    if (nonCareServicesOther) {
      expect(articleElem.find(Paragraph).text()).toContain(nonCareServicesOther);
    } else {
      expect(articleElem.find(Paragraph)).toHaveLength(0);
    }
  });

  it('verify languages shown', () => {
    const wrapper = wrap({
      communityName: name,
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

    const articleElem = wrapper.find('#amenities-and-features-languages');
    expect(articleElem.find(Heading).text()).toContain('Resident Languages');
    const elements = articleElem.find('ul').children();
    expect(elements).toHaveLength(languages.length);
    elements.forEach((hl, i) => {
      expect(hl.text()).toContain(languages[i]);
    });
    if (languagesOther) {
      expect(articleElem.find(Paragraph).text()).toContain(languagesOther);
    } else {
      expect(articleElem.find(Paragraph)).toHaveLength(0);
    }
  });
});
