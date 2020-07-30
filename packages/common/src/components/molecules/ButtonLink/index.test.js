import React from 'react';
import { shallow } from 'enzyme';

import ButtonLink from '.';

const wrap = (props = {}) => shallow(<ButtonLink {...props} />);

describe('ButtonLink|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find('[id="foo"]')).toHaveLength(1);
  });

  it('renders icon passed in', () => {
    const wrapper = wrap({ icon: 'foo' });
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
});
