import React from 'react';
import { mount } from 'enzyme';

import CommunityLocalDetails from '.';

const wrap = (props = {}) => mount(<CommunityLocalDetails {...props} />);


const communityLocalDetails = 'big text here';

describe('CommunityDetails', () => {
  it('verify local Details are Shown', () => {
    const wrapper = wrap({
      localDetails: communityLocalDetails,
    });
    expect(wrapper.text()).toContain(communityLocalDetails);
  });
});
