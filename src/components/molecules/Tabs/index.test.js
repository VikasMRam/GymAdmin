import React from 'react';
import { shallow } from 'enzyme';

import Tabs from 'sly/components/molecules/Tabs';

const wrap = (props = {}) => shallow(<Tabs {...props} />);
const children = [
  (
    <button id="Gator" key="Gator" onClick={jest.fn()}>
      Gator
    </button>
  ),
  (
    <button id="Croc" key="Croc" onClick={jest.fn()}>
      Croc
    </button>
  ),
];

describe('Tabs', () => {
  it('gets activeTab from props or click', () => {
    const wrapper = wrap({ children });

    wrapper.setProps({ activeTab: 'Croc' });
    const secondTab = wrapper.find('button').at(1);
    expect(secondTab.prop('active')).toBe(true);

    const firstTab = wrapper.find('button').at(0);
    firstTab.simulate('click');
    expect(wrapper.find('button').at(0).prop('active')).toBe(true);
  });
});
