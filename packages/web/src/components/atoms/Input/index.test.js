import React from 'react';
import { shallow } from 'enzyme';

import Input from '.';

const wrap = (props = {}) => shallow(<Input {...props} />);

describe('Input', () => {
  it('renders', () => {
    const wrapper = wrap({ type: 'text' });
    expect(wrapper.dive().find('input[type="text"]')).toHaveLength(1);
  });

  it('renders input by default', () => {
    const wrapper = wrap();
    expect(wrapper.dive().find('input')).toHaveLength(1);
  });

  it('renders select when type is select', () => {
    const wrapper = wrap({ type: 'select' });
    expect(wrapper.dive().find('select')).toHaveLength(1);
  });

  it('renders textarea when type is textarea', () => {
    const wrapper = wrap({ type: 'textarea' });
    expect(wrapper.dive().find('textarea')).toHaveLength(1);
  });
});
