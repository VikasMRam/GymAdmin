import React from 'react';
import { mount } from 'enzyme';

import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';

const wrap = () => mount((
  <Tabs>
    <Tab id="Gator" onClick={jest.fn()}>
      Gator
    </Tab>
    <Tab id="Croc" onClick={jest.fn()}>
      Croc
    </Tab>
  </Tabs>
));

describe('Tabs', () => {
  it('gets activeTab from props or click', () => {
    const wrapper = wrap();

    // wrapper.setProps({  });
    const secondTab = wrapper.find(Tab).at(1);
    expect(secondTab.prop('active')).toBe(false);

    const firstTab = wrapper.find(Tab).at(0);
    expect(firstTab.prop('active')).toBe(true);

    secondTab.simulate('click');
    wrapper.instance().forceUpdate();
    expect(wrapper.find('Tab[id="Croc"]').prop('active')).toBe(true);
  });
});
