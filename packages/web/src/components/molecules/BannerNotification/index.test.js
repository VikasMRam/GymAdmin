import React from 'react';
import { shallow } from 'enzyme';

import BannerNotification from 'sly/web/components/molecules/BannerNotification';

const wrap = (props = {}) => shallow(<BannerNotification {...props} />);

describe('BannerNotification', () => {
  it('renders', () => {
    const wrapper = wrap({ children: 'hello' });
    expect(wrapper.contains('hello')).toBeTruthy();
  });

  it('renders with palette', () => {
    const wrapper = wrap({ children: 'hello', palette: 'slate' });
    expect(wrapper.contains('hello')).toBeTruthy();
    expect(wrapper.dive().prop('type')).toBe('slate');
  });

  it('renders with hasBorderRadius', () => {
    const wrapper = wrap({ children: 'hello', hasBorderRadius: true });
    expect(wrapper.contains('hello')).toBeTruthy();
  });

  it('renders with onCloseClick', () => {
    const wrapper = wrap({ children: 'hello', onCloseClick: jest.fn() });
    expect(wrapper.contains('hello')).toBeTruthy();
    expect(wrapper.find('StyledIconButton')).toHaveLength(1);
  });
});
