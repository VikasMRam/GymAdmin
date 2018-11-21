import React from 'react';
import { shallow } from 'enzyme';

import BannerNotification from 'sly/components/molecules/BannerNotification';

const wrap = (props = {}) => shallow(<BannerNotification {...props} />);

describe('BannerNotification', () => {
  it('renders', () => {
    const wrapper = wrap({ children: 'hello' });
    expect(wrapper.contains('hello')).toBe(true);
  });

  it('renders with palette', () => {
    const wrapper = wrap({ children: 'hello', palette: 'slate' });
    expect(wrapper.contains('hello')).toBe(true);
    expect(wrapper.dive().prop('type')).toBe('slate');
  });
});
