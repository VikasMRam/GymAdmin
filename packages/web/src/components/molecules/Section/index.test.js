import React from 'react';
import { shallow } from 'enzyme';

import Section from '.';

const title = 'Section Title';
const subtitle = 'Section SubTitle';
const wrap = (props = {}) => shallow(<Section title={title} {...props} />);

describe('Section', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders title when passed in', () => {
    const wrapper = wrap({ title, children: 'test' });

    expect(wrapper.dive().find('[testID="Heading"]').text()).toBe(title);
  });

  it('renders subtitle when passed in', () => {
    const wrapper = wrap({ title, subtitle, children: 'test' });

    expect(wrapper.dive().find('Block').text()).toBe(subtitle);
  });
});
