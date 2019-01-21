import React from 'react';
import { shallow } from 'enzyme';

import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList';

const info = {
  typeOfCare: 'Assisted Living',
  price: 7900,
  priceType: 'Monthly Rate',
  roomType: 'Shared',
  shareType: 'Private',
};

const typeOfCare = 'Assisted Living';
const floorPlans = [{ id: 1, info }, { id: 2, info }];

const defaultProp = {
  typeOfCare, floorPlans,
};

const wrap = (props = {}) =>
  shallow(<CommunityFloorPlansList {...defaultProp} {...props} />);

describe('CommunityFloorPlansList', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('handles onItemClick', () => {
    const wrapper = wrap({ });
    expect(wrapper.find(CommunityFloorPlanListItem)).toHaveLength(2);
  });
});
