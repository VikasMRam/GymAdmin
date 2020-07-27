import React from 'react';
import { View } from 'react-native';

import Badge from '.';

import renderWithTheme from 'sly/mobile/private/jest/renderWithTheme';
import { Text } from 'sly/mobile/components/atoms';

const wrap = (props = {}) => renderWithTheme(<Badge {...props} />);

describe('Badge|Mobile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: <View><Text>test</Text></View> });
    expect(wrapper.queryByText('test')).toBeTruthy();
  });

  it('renders text children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.queryByText('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.UNSAFE_getByProps({ id: 'foo' })).toBeTruthy();
  });
});
