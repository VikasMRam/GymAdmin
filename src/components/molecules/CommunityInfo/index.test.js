import React from 'react';
import { shallow } from 'enzyme';
import NumberFormat from 'react-number-format';

import { formatRating } from 'sly/services/helpers/rating';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import { ClampedText } from 'sly/components/atoms';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityInfo community={RhodaGoldmanPlaza} {...props} />);

describe('CommunityInfo', () => {
  const verifyData = (wrapper, community) => {
    const {
      webViewInfo, startingRate, estimated, propRatings, address,
    } = community;
    const {
      line1, line2, city, state, zip,
    } = address;
    const formattedAddress = `${line1}, ${line2}, ${city},
      ${state}
      ${zip}`
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');
    let { reviewsValue } = community;
    if (propRatings) {
      ({ reviewsValue } = propRatings);
    }
    if (webViewInfo) {
      const {
        firstLineValue,
        secondLineValue,
      } = webViewInfo;
      if (firstLineValue) {
        const livingTypes = firstLineValue.split(',');
        livingTypes.forEach((livingType) => {
          expect(wrapper.find('IconTextWrapper').at(1).find(ClampedText).dive()
            .contains(livingType)).toBe(true);
        });
      }
      if (secondLineValue) {
        const roomTypes = secondLineValue.split(',');
        roomTypes.forEach((roomType) => {
          expect(wrapper.find('IconTextWrapper').at(2).find(ClampedText).dive()
            .contains(roomType)).toBe(true);
        });
      }
    }
    expect(wrapper.find('IconTextWrapper').at(0).find(ClampedText).dive()
      .contains(formattedAddress)).toBe(true);
    const rateRendered = wrapper.find('TopWrapper').find('Rate').dive().dive();
    expect(rateRendered
      .find(NumberFormat)
      .dive()
      .text()
      .replace(',', '')).toContain(startingRate);
    if (estimated) {
      expect(rateRendered.text()).toContain('Estimated');
    }
    if (reviewsValue) {
      const reviewsValueFixed = formatRating(reviewsValue);
      expect(wrapper.find('RatingValue').contains(reviewsValueFixed)).toBe(true);
    } else {
      expect(wrapper.find('RatingValue').contains('Not Yet Rated')).toBe(true);
    }
  };

  it('renders', () => {
    const wrapper = wrap();
    verifyData(wrapper, RhodaGoldmanPlaza);
  });

  it('renders with inverted', () => {
    const wrapper = wrap({ inverted: true });
    expect(wrapper.instance().props.inverted).toBeTruthy();
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

  it('renders without FloorPlans & LivingTypes', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.webViewInfo = undefined;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });
    verifyData(wrapper, newRhodaGoldmanPlaza);
  });
});
