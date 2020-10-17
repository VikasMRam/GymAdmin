import React from 'react';
import { shallow } from 'enzyme';

import CommunityDetails, { orderItems } from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityDetails community={RhodaGoldmanPlaza} {...props} />);

describe('CommunityDetails', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('verify no info message shown', () => {
    const noInfoCommunity = {
      ...RhodaGoldmanPlaza,
      propInfo: {},
    };
    const wrapper = wrap({
      community: noInfoCommunity,
    });

    expect(wrapper.find('Paragraph').dive().dive().render()
      .text()).toContain('No information about details currently available');
  });

  it('verify communityHighlights shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communityHighlights = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(0).children();
    const orderedCommunityHighlights = orderItems(communityHighlights, 'communityHighlights');

    elements.slice(0, orderedCommunityHighlights.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(orderedCommunityHighlights[i]);
      });
  });

  it('verify careServices shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      careServices = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(1).children();
    const orderedCareServices = orderItems(careServices, 'careServices');

    elements.slice(0, orderedCareServices.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(orderedCareServices[i]);
      });
  });

  it('verify nonCareServices shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      nonCareServices = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(2).children();
    const orderedNonCareServices = orderItems(nonCareServices, 'nonCareServices');

    elements.slice(0, orderedNonCareServices.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(orderedNonCareServices[i]);
      });
  });

  it('verify personalSpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      personalSpace = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(3).children();
    const orderedPersonalSpace = orderItems(personalSpace, 'personalSpace');

    elements.slice(0, orderedPersonalSpace.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(orderedPersonalSpace[i]);
      });
  });

  it('verify communitySpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communitySpace = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(4).children();
    const orderedCommunitySpace = orderItems(communitySpace, 'communitySpace');

    elements.slice(0, orderedCommunitySpace.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(orderedCommunitySpace[i]);
      });
  });
});
