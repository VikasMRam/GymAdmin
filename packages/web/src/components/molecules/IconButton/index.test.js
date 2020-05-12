import React from 'react';
import { mount, shallow } from 'enzyme';

import IconButton from 'sly/web/components/molecules/IconButton';

const wrap = (props = {}) => shallow(<IconButton icon="github" {...props} />);

describe('IconButton', () => {
  it('mounts with different combination of props', () => {
    mount(<IconButton icon="github">test</IconButton>);
    mount(<IconButton icon="github" right>test</IconButton>);
    mount(<IconButton icon="github" collapsed>test</IconButton>);
    mount(<IconButton icon="github" />);
    mount(<IconButton icon="github" right />);
  });

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });
});
