import React from 'react';
import { shallow } from 'enzyme';

import CommunityDetails from '.';

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

    elements.slice(0, communityHighlights.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(communityHighlights[i]);
      });
  });

  it('verify careServices shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      careServices = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(1).children();

    elements.slice(0, careServices.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(careServices[i]);
      });
  });

  it('verify nonCareServices shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      nonCareServices = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(2).children();

    elements.slice(0, nonCareServices.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(nonCareServices[i]);
      });
  });

  it('verify personalSpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      personalSpace = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(3).children();

    elements.slice(0, personalSpace.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(personalSpace[i]);
      });
  });

  it('verify communitySpace shown', () => {
    const { propInfo } = RhodaGoldmanPlaza;
    const {
      communitySpace = [],
    } = propInfo;
    const wrapper = wrap();
    const elements = wrapper.find('Grid').find('Wrapper').at(4).children();

    elements.slice(0, communitySpace.length)
      .forEach((hl, i) => {
        expect(hl.find('IconItem').dive().dive().find('Block')
          .render()
          .text()).toContain(communitySpace[i]);
      });
  });
});
