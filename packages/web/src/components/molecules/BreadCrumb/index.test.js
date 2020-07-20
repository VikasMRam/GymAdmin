import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'sly/web/components/atoms';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';

const items = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/assisted-living',
    label: 'Assisted living',
  },
  {
    path: '/assisted-living/california',
    label: 'california',
  },
  {
    path: '/assisted-living/california/san-fransisco',
    label: 'san fransisco',
  },
  {
    path: '/assisted-living/california/san-fransisco/rhoda-goldman-plaza',
    label: 'Rhoda Goldman Plaza',
  },
];

const wrap = (props = {}) => shallow(<BreadCrumb {...props} />);

describe('BreadCrumb', () => {
  it('renders with more than one item', () => {
    const wrapper = wrap({ items });
    const ol = wrapper.find('ol');
    const li = ol.find('li');
    const link = li.find(Link);

    expect(ol).toHaveLength(1);
    expect(li).toHaveLength(items.length);
    expect(link).toHaveLength(items.length - 1);
  });

  it('renders with one item', () => {
    const splicedItems = items.slice(0, 1);
    const wrapper = wrap({ items: splicedItems });
    const ol = wrapper.find('ol');
    const li = ol.find('li');
    const link = li.find(Link);

    expect(ol).toHaveLength(1);
    expect(li).toHaveLength(splicedItems.length);
    expect(link).toHaveLength(splicedItems.length - 1);
  });
});
