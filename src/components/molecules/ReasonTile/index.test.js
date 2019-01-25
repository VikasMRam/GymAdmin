import React from 'react';
import { mount, shallow } from 'enzyme';

import ReasonTile, { Wrapper, StyledHeading }
  from 'sly/components/molecules/ReasonTile';

const wrap = (props = {}) => mount(<ReasonTile {...props} />);
const wrapShallow = (props = {}) => shallow(<ReasonTile {...props} />);

const image = '//d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-16_hd.jpg';

const title = 'Sample Title ';
const to = '/sample-link';
const text = 'This is some text';

describe('ReasonTile', () => {
  it('verify image being set', () => {
    const wrapper = wrap({
      image,
    });
    expect(wrapper.find('Image').props()).toHaveProperty('src', image);
  });

  it('verify title being set', () => {
    const wrapper = wrap({
      image, title,
    });
    expect(wrapper.find(StyledHeading).text()).toEqual(title);
  });

  it('verify text being set', () => {
    const wrapper = wrap({
      image, title, text,
    });
    expect(wrapper.find('div').last().text()).toContain(text);
  });
  //
  it('verify to link being set', () => {
    const wrapper = wrapShallow({
      image, title, to,
    });
    expect(wrapper.find(Wrapper).props()).toHaveProperty('to', to);
  });
});
