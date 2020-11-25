import React from 'react';
import { shallow } from 'enzyme';

import CommunityInfo from '.';

import { formatRating } from 'sly/web/services/helpers/rating';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => shallow(<CommunityInfo community={RhodaGoldmanPlaza} {...props} />);

describe('CommunityInfo', () => {
  it('renders', () => {
    const wrapper = wrap();
    RhodaGoldmanPlaza.care.forEach((livingType) => {
      expect(
        wrapper
          .find('IconItem')
          .at(0)
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
    newRhodaGoldmanPlaza.care = undefined;
    newRhodaGoldmanPlaza.propInfo = undefined;
    newRhodaGoldmanPlaza.webViewInfo = undefined;
    const wrapper = wrap({ community: newRhodaGoldmanPlaza });

    expect(wrapper.find('IconItem')).toHaveLength(1);
  });
});
