import React from 'react';
import { shallow } from 'enzyme';

import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';

const heading = 'test heading';
const body = 'test body';
const defaultProps = {
  heading,
};

const wrap = (props = {}) => shallow(<HeadingBoxSection {...defaultProps} {...props}>{body}</HeadingBoxSection>);

describe('HeadingBoxSection', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('HeadingBlock').contains(heading)).toBeTruthy();
    expect(wrapper.contains(body)).toBeTruthy();
  });
});
