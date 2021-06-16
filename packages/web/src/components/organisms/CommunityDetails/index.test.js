import React from 'react';
import { shallow } from 'enzyme';

import CommunityDetails, { orderItems } from '.';

import { capitalize } from 'sly/web/services/helpers/utils';
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
    expect(wrapper.find('Paragraph').render()
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

    elements
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(capitalize(orderedCommunityHighlights[i]));
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

    elements
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(capitalize(orderedCareServices[i]));
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

    elements
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(capitalize(orderedNonCareServices[i]));
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

    elements
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(capitalize(orderedPersonalSpace[i]));
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

    elements
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(capitalize(orderedCommunitySpace[i]));
      });
  });
});
