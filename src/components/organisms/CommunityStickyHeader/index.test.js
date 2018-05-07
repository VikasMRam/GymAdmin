import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'sly/components/atoms';

import CommunityStickyHeader from '.';

const dummyRef = React.createRef();
const items = [
  { label: 'Summary', ref: dummyRef },
  { label: 'Pricing & Floor Plans', ref: dummyRef },
  { label: 'Reviews', ref: dummyRef },
];
const wrap = (props = {}) => shallow(<CommunityStickyHeader {...props} />);

describe('CommunityStickyHeader', () => {
  it('renders with items', () => {
    const wrapper = wrap({ items });
    const ol = wrapper.find('ol');
    const li = ol.find('li');
    const link = li.find(Link);

    expect(ol).toHaveLength(1);
    expect(li).toHaveLength(items.length);
    expect(link).toHaveLength(items.length);
  });
});
