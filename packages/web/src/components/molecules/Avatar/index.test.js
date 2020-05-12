import React from 'react';
import { shallow } from 'enzyme';

import Avatar from 'sly/web/components/molecules/Avatar';

const wrap = (props = {}) => shallow(<Avatar {...props} />);

const name = 'Fonz';
const fullname = 'Amal Francis';
const picture = {
  src: 'https://avatars.githubusercontent.com/u/113003',
};
const picturePath = {
  path: '3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-22.jpg',
};

describe('Avatar', () => {
  it('renders image when one passed', () => {
    const wrapper = wrap({ user: { name, picture } });
    const img = wrapper.find('StyledImg');

    expect(img).toHaveLength(1);
    expect(img.props()).toHaveProperty('src', picture.src);
  });

  it('renders image when path passed', () => {
    const wrapper = wrap({ user: { name, picture: picturePath } });
    const img = wrapper.find('StyledImg');

    expect(img).toHaveLength(1);
    expect(img.props()).toHaveProperty('path', picturePath.path);
  });

  it('renders first letter in the absence of picture', () => {
    const wrapper = wrap({ user: { name } });
    const div = wrapper.dive().find('div');

    expect(div).toHaveLength(1);
    expect(div.props()).toHaveProperty('data-title', name);
    expect(div.text()).toEqual('F');
  });

  it('renders first letter of first and last name in the absence of picture', () => {
    const wrapper = wrap({ user: { name: fullname } });
    const div = wrapper.dive().find('div');

    expect(div).toHaveLength(1);
    expect(div.props()).toHaveProperty('data-title', fullname);
    expect(div.text()).toEqual('AF');
  });
});
