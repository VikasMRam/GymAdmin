import React from 'react';
import { shallow } from 'enzyme';

import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';

const wrap = (props = {}) => shallow(<Tabs {...props} />);
const children = [
  (
    <div id="Gator" key="Gator" onClick={jest.fn()}>
      Gator
    </div>
  ),
  (
    <div id="Croc" key="Croc" onClick={jest.fn()}>
      Croc
    </div>
  ),
];

describe('Tabs', () => {
  it('gets activeTab from props or click', () => {
    const wrapper = wrap({ children });

    wrapper.setProps({ activeTab: 'Croc' });
    const secondTab = wrapper.find('div').at(1);
    expect(secondTab.prop('active')).toBe(true);

    const firstTab = wrapper.find('div').at(0);
    firstTab.simulate('click');
    expect(wrapper.find('div').at(0).prop('active')).toBe(true);
  });
});
