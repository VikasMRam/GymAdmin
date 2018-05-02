import React from 'react';
import { mount } from 'enzyme';

import OwnerStory from '.';

const wrap = (props = {}) => mount(<OwnerStory {...props} />);

const ownerExperience = 'OwnerStory text here';

describe('OwnerStory', () => {
  it('verify ownerExprience is shown', () => {
    const wrapper = wrap({
      ownerExperience,
    });
    expect(wrapper.text()).toContain(ownerExperience);
  });

  it('verify ownerExprience is not shown', () => {
    const wrapper = wrap();
    expect(wrapper.text()).toContain("No owner's story available");
  });
});
