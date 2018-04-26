import React from 'react';
import { mount } from 'enzyme';

import { Heading } from 'sly/components/atoms';
import ListItem from 'sly/components/molecules/ListItem';

import List from '.';

const wrap = (props = {}) => mount(<List {...props} />);

const heading = 'test heading';
const items = ['item 1', 'item 2', 'item 3'];

describe('List', () => {
  it('verify heading shown', () => {
    const wrapper = wrap({ heading });
    expect(wrapper.find(Heading).text()).toBe(heading);
  });

  it('verify list items shown', () => {
    const wrapper = wrap({ heading, items });
    const listItems = wrapper.find(ListItem);
    expect(listItems).toHaveLength(items.length);
    listItems.forEach((item, i) => {
      expect(item.text()).toBe(items[i]);
    });
  });
});
