import React from 'react';
import { shallow } from 'enzyme';
import NumberFormat from 'react-number-format';

import { formatRating } from 'sly/services/helpers/rating';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

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
        .dive()
        .dive()
        .text()
    ).toContain(expectedAddress);
    RhodaGoldmanPlaza.webViewInfo.firstLineValue.split(',').forEach((livingType) => {
      expect(
        wrapper
          .find('IconTextWrapper')
          .at(1)
          .find('Info')
          .dive()
          .dive()
          .text()
      ).toContain(livingType);
    });
    RhodaGoldmanPlaza.webViewInfo.secondLineValue.split(',').forEach((roomType) => {
      expect(
        wrapper
          .find('IconTextWrapper')
          .at(2)
          .find('Info')
          .dive()
          .dive()
          .text()
      ).toContain(roomType);
    });
    expect(wrapper.find(NumberFormat).html()).toBe('$6,027/month');
    expect(wrapper.find('TopWrapper').html()).toContain(formatRating(RhodaGoldmanPlaza.propRatings.reviewsValue));
  });

  it('renders with inverted', () => {
    const wrapper = wrap({ inverted: true });
    expect(wrapper.instance().props.inverted).toBeTruthy();
  });

  it('renders with estimated price', () => {
    const wrapper = wrap({ community: { ...RhodaGoldmanPlaza, estimated: true } });

    expect(wrapper.find(NumberFormat).html()).toBe('Estimated $6,027/month');
  });

  it('renders without reviews', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.propRatings.reviewsValue = 0;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('TopWrapper').html()).toContain('Not Yet Rated');
  });

  it('renders without FloorPlans & LivingTypes', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.webViewInfo = undefined;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('IconTextWrapper')).toHaveLength(2);
  });
});
