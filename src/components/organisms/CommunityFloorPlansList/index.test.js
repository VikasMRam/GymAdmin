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

const careType = 'Assisted Living';
const create = {
  careType,
};
const fp1 = { id: 1, info, create };
const fp2 = { id: 2, info, create };
const floorPlans = [fp1, fp2];

const defaultProp = { floorPlans };

const wrap = (props = {}) =>
  shallow(<CommunityFloorPlansList {...defaultProp} {...props} />);

describe('CommunityFloorPlansList', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
    expect(wrapper.find(CommunityFloorPlanListItem)).toHaveLength(2);
  });

  it('handles onItemClick', () => {
    const onItemClick = jest.fn();
    const wrapper = wrap({ floorPlans: [fp1], onItemClick });
    expect(wrapper.find(CommunityFloorPlanListItem)).toHaveLength(1);
    const fp1Component = wrapper.find(CommunityFloorPlanListItem);
    fp1Component.simulate('itemClick');
    expect(onItemClick).toBeCalledWith(fp1);
  });
});
