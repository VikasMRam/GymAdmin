import React from 'react';
import { shallow } from 'enzyme';

import Tabs from 'sly/components/molecules/Tabs';

const wrap = (props = {}) => shallow(<Tabs {...props} />);
const children = [
  (
    <div label="Gator">
      See ya later, <em>Alligator</em>!
    </div>
  ),
  (
    <div label="Croc">
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
});
