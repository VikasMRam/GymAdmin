import React from 'react';

import Badge from './';

import renderWithTheme from 'sly/mobile/private/jest/renderWithTheme';

const wrap = (props = {}) => renderWithTheme(<Badge {...props} />);

describe('Badge|Mobile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.getByText('test')).toBeTruthy();
  });
});
