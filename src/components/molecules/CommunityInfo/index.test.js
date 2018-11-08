import React from 'react';
import { shallow } from 'enzyme';
import NumberFormat from 'react-number-format';

import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import { ClampedText } from 'sly/components/atoms';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityInfo community={RhodaGoldmanPlaza} {...props} />);
const palette = 'danger';

describe('CommunityInfo', () => {
  const verifyData = (wrapper, community) => {
    const {
      webViewInfo, startingRate, reviewsValue, estimated,
    } = community;
    const {
      firstLineValue,
      secondLineValue,
    } = webViewInfo;
    const livingTypes = firstLineValue.split(',');
    const roomTypes = secondLineValue.split(',');

    roomTypes.forEach((roomType) => {
      expect(wrapper.find('IconTextWrapper').at(0).find(ClampedText).dive()
        .contains(roomType)).toBe(true);
    });
    livingTypes.forEach((livingType) => {
      expect(wrapper.find('LastIconTextWrapper').at(0).find(ClampedText).dive()
        .contains(livingType)).toBe(true);
    });
    const rateRendered = wrapper.find('RatingWrapper').find('Rate').dive().dive();
    expect(rateRendered.find(NumberFormat)
      .dive()
      .text()
      .replace(',', '')).toContain(startingRate);
    if (estimated) {
      expect(rateRendered.text()).toContain('Estimated');
    }
    if (reviewsValue) {
      expect(wrapper.find('Rating').contains(reviewsValue)).toBe(true);
    } else {
      expect(wrapper.find('Rating').contains('Not Yet Rated')).toBe(true);
    }
  };

  it('renders', () => {
    const wrapper = wrap();
    verifyData(wrapper, RhodaGoldmanPlaza);
  });

  it('renders with palette', () => {
    const wrapper = wrap({ palette });
    expect(wrapper.instance().props.palette).toBe(palette);
    verifyData(wrapper, RhodaGoldmanPlaza);
  });

  it('renders with estimated price', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.estimated = true;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });
    verifyData(wrapper, newRhodaGoldmanPlaza);
  });

  it('renders without reviews', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.reviewsValue = null;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });
    verifyData(wrapper, newRhodaGoldmanPlaza);
  });
});
