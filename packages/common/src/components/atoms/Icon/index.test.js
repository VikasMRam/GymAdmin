import React from 'react';
import { shallow } from 'enzyme';

import Icon from '.';

const wrap = (props = {}) => shallow(<Icon icon="star" {...props} />);

describe('Icon', () => {
  it('renders with different combination of props', () => {
    wrap({ height: 40 });
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.dive().dive().find('span[id="foo"]')).toHaveLength(1);
  });
});
