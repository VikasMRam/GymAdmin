import React from 'react';
import { shallow } from 'enzyme';

import BackLink from 'sly/components/molecules/BackLink';

const defaultProps = {
  to: '/',
};
const linkText = 'test link';

const wrap = (props = {}) => shallow(<BackLink {...defaultProps} {...props} />);

describe('BackLink', () => {
  it('renders', () => {
    const wrapper = wrap({
      linkText,
    });
    expect(wrapper.contains(linkText)).toBeTruthy();
  });
});
