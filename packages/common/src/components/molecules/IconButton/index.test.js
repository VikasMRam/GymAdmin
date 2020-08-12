import React from 'react';
import { shallow } from 'enzyme';

import IconButton from '.';

const wrap = (props = {}) => shallow(<IconButton icon="github" {...props} />);

describe('IconButton', () => {
  it('mounts with different combination of props', () => {
    shallow(<IconButton icon="github">test</IconButton>);
    shallow(<IconButton icon="github" right>test</IconButton>);
    shallow(<IconButton icon="github" collapsed>test</IconButton>);
    shallow(<IconButton icon="github" />);
    shallow(<IconButton icon="github" right />);
  });

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });
});
