import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement';
import CommunitySATAppointmentTile from 'sly/components/molecules/CommunitySATAppointmentTile/index';

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  communityImageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/a634ab75e610e745ced00211580c5d54/RGP-June-2014_hd2_sd.jpg',
  appointmentText: 'Saturday, October 21 in the Morning',
};

const wrap = (props = {}) => shallow(<CommunitySATAcknowledgement {...defaultProps} {...props} />);

describe('CommunitySATAcknowledgement', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunitySATAcknowledgement', () => {
    const wrapper = wrap().dive();
    expect(wrapper.find(CommunitySATAppointmentTile)).toHaveLength(1);
  });
});
