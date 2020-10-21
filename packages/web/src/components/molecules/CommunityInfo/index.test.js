import React from 'react';
import { shallow } from 'enzyme';

import CommunityInfo from '.';

import { formatRating } from 'sly/web/services/helpers/rating';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityInfo community={RhodaGoldmanPlaza} {...props} />);

const expectedAddress = `${RhodaGoldmanPlaza.address.line1}, ${RhodaGoldmanPlaza.address.city}, ${RhodaGoldmanPlaza.address.state} ${RhodaGoldmanPlaza.address.zip}`;

describe('CommunityInfo', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(
      wrapper
        .find('IconTextWrapper')
        .at(0)
        .find('Info')
        .render()
        .text(),
    ).toContain(expectedAddress);
    RhodaGoldmanPlaza.webViewInfo.firstLineValue.split(',').forEach((livingType) => {
      expect(
        wrapper
          .find('IconTextWrapper')
          .at(1)
          .find('Info')
          .render()
          .text(),
      ).toContain(livingType);
    });
    RhodaGoldmanPlaza.webViewInfo.secondLineValue.split(',').forEach((roomType) => {
      expect(
        wrapper
          .find('IconTextWrapper')
          .at(2)
          .find('Info')
          .render()
          .text(),
      ).toContain(roomType);
    });
    expect(wrapper.find('Rate').text()).toBe('$6,027/month');
    expect(wrapper.find('TopWrapper').html()).toContain(formatRating(RhodaGoldmanPlaza.propRatings.reviewsValue));
  });

  it('renders with inverted', () => {
    const wrapper = wrap({ inverted: true });
    expect(wrapper.instance().props.inverted).toBeTruthy();
  });

  it('renders with estimated price', () => {
    const wrapper = wrap({ community: { ...RhodaGoldmanPlaza, estimated: true } });

    expect(wrapper.find('Rate').text()).toBe('Estimated $6,027/month');
  });

  it('renders without reviews', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.propRatings.reviewsValue = 0;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('TopWrapper').html()).toContain('Not yet rated');
  });

  it('renders without FloorPlans & LivingTypes', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.webViewInfo = undefined;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('IconTextWrapper')).toHaveLength(2);
  });
});
