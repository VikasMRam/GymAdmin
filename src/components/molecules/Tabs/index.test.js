import React from 'react';
import { shallow } from 'enzyme';

import Tabs from 'sly/components/molecules/Tabs';

const wrap = (props = {}) => shallow(<Tabs {...props} />);
const children = [
  (
    <div id="Gator" label="Gator">
      See ya later, <em>Alligator</em>!
    </div>
  ),
  (
    <div id="Croc" label="Croc">
      After while, <em>Crocodile</em>!
    </div>
  ),
];

describe('Tabs', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap({ children });
    expect(wrapper.contains('Alligator')).toBe(true);
  });

  it('renders Tabs with buttons', () => {
    const wrapper = wrap({ children });
    const tabs = wrapper.find('CursorTab');
    const crocTab = tabs.at(1);
    crocTab.simulate('click');
    expect(wrapper.state('activeTab')).toEqual('Croc');
    expect(wrapper.contains('Crocodile')).toBe(true);
  });

  it('renders a default Tab', () => {
    const copy = [
      ...children,
      <div default id="Extra" label="Extra">
        One more!
      </div>,
    ];

    const wrapper = wrap({
      children: copy,
    });

    expect(wrapper.contains('One more!')).toBe(true);
  });

  it('gets activeTab from props', () => {
    const wrapper = wrap({ children });
    expect(wrapper.contains('Alligator')).toBe(true);

    wrapper.setProps({ activeTab: 'Croc' });
    expect(wrapper.contains('Crocodile')).toBe(true);

    const tabs = wrapper.find('CursorTab');
    const firstTab = tabs.at(0);
    firstTab.simulate('click');
    expect(wrapper.contains('Alligator')).toBe(true);

    wrapper.setProps({ activeTab: 'Croc' });
    expect(wrapper.contains('Crocodile')).toBe(true);
  });
});
