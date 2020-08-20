import React from 'react';
import { shallow } from 'enzyme';

import Icon from '.';

const wrap = (props = {}) => shallow(<Icon icon="star" {...props} />);

describe('Icon|Web', () => {
  it('renders with different combination of props', () => {
    wrap({ height: 40 });
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.dive().dive().dive().dive()
      .find('div[id="foo"]')).toHaveLength(1);
  });
});
