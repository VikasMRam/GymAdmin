import React from 'react';
import { shallow } from 'enzyme';

import CommunityAgentSection from '.';

import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const wrap = (props = {}) =>
  shallow(<CommunityAgentSection agent={LindaIwamota} {...props} />);

describe('CommunityAgentSection', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.contains(LindaIwamota.info.displayName)).toBeTruthy();
    expect(wrapper.find('Avatar').prop('name')).toEqual(LindaIwamota.info.displayName);
    expect(wrapper.find('Avatar').prop('path')).toEqual(LindaIwamota.gallery.images[0].path);
    expect(wrapper.find('Block').at(3).dive().text()).toEqual(`${LindaIwamota.info.recentFamiliesHelped} families helped`);
  });
});
