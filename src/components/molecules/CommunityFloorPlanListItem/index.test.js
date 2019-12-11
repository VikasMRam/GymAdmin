import React from 'react';
import { shallow } from 'enzyme';

import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';

const defaultProp = {
  typeOfCare: 'Assisted Living',
  price: 7900,
  priceType: 'Monthly Rate',
  roomType: 'Shared',
  shareType: 'Private',
};

const wrap = (props = {}) =>
  shallow(<CommunityFloorPlanListItem {...defaultProp} {...props} />);

describe('CommunityFloorPlanListItem', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders with image passed', () => {
    const wrapper = wrap({ image: 'abc.png' });
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('renders shared price', () => {
    const wrapper = wrap({ shareType: 'Shared', priceShared: 8234.34 });
    expect(wrapper.contains(defaultProp.price)).toBe(false);
    expect(wrapper.find('StyledNumberFormat').text()).toEqual('$8,234');
  });

  it('handles onItemClick', () => {
    const onItemClick = jest.fn();
    const wrapper = wrap({ onItemClick });
    wrapper.simulate('click');
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
