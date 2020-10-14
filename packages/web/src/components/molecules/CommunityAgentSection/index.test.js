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

    expect(wrapper.contains(LindaIwamota.name)).toBeTruthy();
    expect(wrapper.find('Avatar').prop('user')).toEqual({
      name: LindaIwamota.name,
      picture: { src: LindaIwamota.info.profileImageUrl },
    });
    expect(wrapper.find('IconItem').at(1).dive().text()).toEqual(`${LindaIwamota.info.recentFamiliesHelped} families helped`);
  });
});
