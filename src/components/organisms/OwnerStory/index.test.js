import React from 'react';
import { mount } from 'enzyme';

import OwnerStory from '.';

const wrap = (props = {}) => mount(<OwnerStory {...props} />);

const ownerExprience = 'OwnerStory text here';

describe('OwnerStory', () => {
  it('verify ownerExprience is shown', () => {
    const wrapper = wrap({
      ownerExprience,
    });
    expect(wrapper.text()).toContain(ownerExprience);
  });

  it('verify ownerExprience is not shown', () => {
    const wrapper = wrap();
    expect(wrapper.text()).toContain("No owner's story available");
  });
});
