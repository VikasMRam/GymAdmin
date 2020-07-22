import React from 'react';

import Box from '.';

import renderWithTheme from 'sly/mobile/private/jest/renderWithTheme';

const wrap = (props = {}) => renderWithTheme(<Box {...props} />);

describe('Box|Mobile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.queryByText('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.UNSAFE_getByProps({ id: 'foo' })).toBeTruthy();
  });
});
