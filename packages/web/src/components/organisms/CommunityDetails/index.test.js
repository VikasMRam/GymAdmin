import React from 'react';
import { mount } from 'enzyme';

import CommunityDetails from '.';

const wrap = (props = {}) => mount(<CommunityDetails {...props} />);

const id = 'test-comm'
const communityName = 'testCommunityName';
const communityDescription = 'communityDescription text here';
const staffDescription = 'staffDescription text here';
const residentDescription = 'residentDescription text here';

describe('CommunityDetails', () => {
  it('verify communityDescription is shown', () => {
    const wrapper = wrap({
      id, communityName, communityDescription,
    });
    expect(wrapper.text()).toContain(communityDescription);
  });

  it('verify staffDescription is shown', () => {
    const wrapper = wrap({
      id, communityName, communityDescription, staffDescription,
    });
    expect(wrapper.text()).toContain(communityDescription);
    expect(wrapper.text()).toContain(staffDescription);
  });

  it('verify residentDescription is shown', () => {
    const wrapper = wrap({
      id, communityName, communityDescription, staffDescription, residentDescription,
    });
    expect(wrapper.text()).toContain(communityDescription);
    expect(wrapper.text()).toContain(staffDescription);
    expect(wrapper.text()).toContain(residentDescription);
  });
});
