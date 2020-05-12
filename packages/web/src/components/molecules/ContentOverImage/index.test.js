import React from 'react';
import { shallow } from 'enzyme';

import ContentOverImage from 'sly/web/components/molecules/ContentOverImage';

const defaultProps = {
  image: 'images/test.png',
  children: 'test',
};
const wrap = (props = {}) => shallow(<ContentOverImage {...defaultProps} {...props} />);

describe('ContentOverImage', () => {
  it('renders', () => {
    const wrapper = wrap();
    const img = wrapper.find('StyledImage');

    expect(img).toHaveLength(1);
    expect(img.prop('path')).toBe(defaultProps.image);
    expect(wrapper.contains(defaultProps.children)).toBeTruthy();
  });
});
