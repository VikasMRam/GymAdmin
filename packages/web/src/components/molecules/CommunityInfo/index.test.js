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
        .find('IconItem')
        .at(0)
        .render()
        .text(),
    ).toContain(expectedAddress);
    RhodaGoldmanPlaza.webViewInfo.firstLineValue.split(',').forEach((livingType) => {
      expect(
        wrapper
          .find('IconItem')
          .at(1)
          .render()
          .text(),
      ).toContain(livingType);
    });
    expect(wrapper.find('Block').find('[testID="Rate"]').text()).toContain('$6,027');
    expect(wrapper.find('CommunityRating').html()).toContain(formatRating(RhodaGoldmanPlaza.propRatings.reviewsValue));
  });

  it('renders with inverted', () => {
    const wrapper = wrap({ inverted: true });
    expect(wrapper.instance().props.inverted).toBeTruthy();
  });

  it('renders with estimated price', () => {
    const wrapper = wrap({ community: { ...RhodaGoldmanPlaza, estimated: true } });

    expect(wrapper.find('Block').find('[testID="Rate"]').text()).toContain('$6,027');
  });

  it('renders without LivingTypes', () => {
    const newRhodaGoldmanPlaza = { ...RhodaGoldmanPlaza };
    newRhodaGoldmanPlaza.propInfo = undefined;
    newRhodaGoldmanPlaza.webViewInfo = undefined;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('IconItem')).toHaveLength(1);
  });
});
