import React from 'react';

import renderWithTheme from 'sly/mobile/private/jest/renderWithTheme';
import { Badge } from 'sly/common/components/atoms';

const wrap = (props = {}) => renderWithTheme(<Badge {...props} />);

describe('LoginScreen', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.getByText('test')).toBeTruthy();
  });
});
