import React from 'react';
import { mount } from 'enzyme';

import Avatar from 'sly/components/atoms/Avatar';

const wrap = (props = {}) => mount(<Avatar {...props} />);

const name = 'Fonz';
const fullname = 'Amal Francis';
const picture = 'https://avatars.githubusercontent.com/u/113003';

describe('Avatar', () => {
  it('renders image when one passed', () => {
    const wrapper = wrap({ user: { name, picture } });
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').props()).toHaveProperty('src', picture);
  });

  it('renders first letter in the absence of picture', () => {
    const wrapper = wrap({ user: { name } });
    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
    expect(div.props()).toHaveProperty('data-title', name);
    expect(div.text()).toEqual('F');
  });

  it('renders first letter of first and last name in the absence of picture', () => {
    const wrapper = wrap({ user: { name: fullname } });
    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
    expect(div.props()).toHaveProperty('data-title', fullname);
    expect(div.text()).toEqual('AF');
  });
});
