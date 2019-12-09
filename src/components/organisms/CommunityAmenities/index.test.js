import React from 'react';
import { shallow } from 'enzyme';

import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityAmenities community={RhodaGoldmanPlaza} {...props} />);

describe('CommunityAmenities', () => {
  it('verify no info message shown', () => {
    const noInfoCommunity = {
      ...RhodaGoldmanPlaza,
      propInfo: {},
    };
    const wrapper = wrap({
      community: noInfoCommunity,
    });

    expect(wrapper.find('Paragraph').dive().dive().render().text()).toContain('No information about amenities currently available');
  });

  it('verify communityHighlights shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Wrapper').children();

    elements.slice(0, communityHighlights.length).forEach((hl, i) => {
      expect(hl.find('IconItem').dive().dive().find('Block')
        .render()
        .text()).toContain(communityHighlights[i]);
    });
  });

  it('verify personalSpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
      personalSpace = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Wrapper').children();

    elements.slice(communityHighlights.length, personalSpace.length).forEach((hl, i) => {
      expect(hl.find('IconItem').render().text()).toContain(personalSpace[i]);
    });
  });

  it('verify communitySpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
      personalSpace = [],
      communitySpace = [],
    } = propInfo;
    const start = communityHighlights.length + personalSpace.length;
    const wrapper = wrap();
    const elements = wrapper.find('Wrapper').children();

    elements.slice(start, communitySpace.length).forEach((hl, i) => {
      expect(hl.find('IconItem').dive().dive().find('Block')
        .dive()
        .text()).toContain(communitySpace[i]);
    });
  });

  it('verify nonCareServices shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
      personalSpace = [],
      communitySpace = [],
      nonCareServices = [],
    } = propInfo;
    const start = communityHighlights.length + personalSpace.length + communitySpace.length;
    const wrapper = wrap();
    const elements = wrapper.find('Wrapper').children();

    elements.slice(start, nonCareServices.length).forEach((hl, i) => {
      expect(hl.find('IconItem').dive().dive().find('Block')
        .dive()
        .text()).toContain(nonCareServices[i]);
    });
  });

  it('verify languages shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
      personalSpace = [],
      communitySpace = [],
      nonCareServices = [],
      languages = [],
    } = propInfo;
    const start = communityHighlights.length + personalSpace.length + communitySpace.length + nonCareServices.length;
    const wrapper = wrap();
    const elements = wrapper.find('Wrapper').children();

    elements.slice(start, languages.length).forEach((hl, i) => {
      expect(hl.find('IconItem').dive().dive().find('Block')
        .dive()
        .text()).toContain(languages[i]);
    });
  });
});
