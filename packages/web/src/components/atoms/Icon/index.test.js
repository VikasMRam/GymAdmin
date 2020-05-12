// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { mount } from 'enzyme';

import Icon from 'sly/web/components/atoms/Icon';

const wrap = (props = {}) => mount(<Icon icon="star" {...props} />);

it('renders with different combination of props', () => {
  wrap({ height: 40 });
});

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' });
  expect(wrapper.find('span[id="foo"]')).toHaveLength(1);
});
