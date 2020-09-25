import React from 'react';
import { mount } from 'enzyme';

import CommunityAbout from '.';

const wrap = (props = {}) => mount(<CommunityAbout {...props} />);

const id = 'test-comm'
const communityName = 'testCommunityName';
const communityDescription = 'communityDescription text here';
const staffDescription = 'staffDescription text here';
const residentDescription = 'residentDescription text here';

describe('CommunityAbout', () => {
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
