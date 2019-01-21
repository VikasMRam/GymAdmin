import React from 'react';
import { shallow } from 'enzyme';

import CommunityBookATourAppointmentTile from 'sly/components/molecules/CommunityBookATourAppointmentTile';

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  communityImageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/a634ab75e610e745ced00211580c5d54/RGP-June-2014_hd2_sd.jpg',
  appointmentText: 'Saturday, October 21 in the Morning',
};

const wrap = (props = {}) => shallow(<CommunityBookATourAppointmentTile {...defaultProps} {...props} />);

describe('CommunityBookATourAppointmentTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunityBookATourAppointmentTile', () => {
    const wrapper = wrap().dive();
    expect(wrapper.contains(defaultProps.communityName)).toBe(true);
    expect(wrapper.contains(defaultProps.appointmentText)).toBe(true);
    expect(wrapper.find('StyledImage')).toHaveLength(1);
  });
});
