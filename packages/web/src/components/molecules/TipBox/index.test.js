import React from 'react';
import { shallow } from 'enzyme';

import TipBox from 'sly/web/components/molecules/TipBox';

const heading = 'test heading';
const defaultProps = {
  heading,
};
const wrap = (props = {}) => shallow(<TipBox {...defaultProps} {...props} />);

describe('TipBox', () => {
  it('renders', () => {
    const children = 'test children';
    const wrapper = wrap({
      children,
    });

    expect(wrapper.find('PaddedBlock').contains(heading)).toBeTruthy();
    expect(wrapper.contains(children)).toBeTruthy();
  });
});
