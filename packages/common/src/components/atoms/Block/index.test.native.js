import React from 'react';
import { Text } from 'react-native';

import Block from '.';

import renderWithTheme from 'sly/mobile/private/jest/renderWithTheme';

const wrap = (props = {}) => renderWithTheme(<Block {...props} />);

describe('Block|Mobile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: <Text>test</Text> });
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
