import React from 'react';
import { shallow } from 'enzyme';

import ChatBox from '.';

const wrap = (props = {}) => shallow(<ChatBox {...props} />);

describe('ChatBox', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.instance().props.footerReached).toBe(false);
    expect(wrapper.instance().props.pageWithStickyFooter).toBe(false);
  });

  it('renders when footerReached property passed', () => {
    const wrapper = wrap({ footerReached: true });
    expect(wrapper.instance().props.footerReached).toBe(true);
  });

  it('renders when footerReached property passed', () => {
    const wrapper = wrap({ pageWithStickyFooter: true });
    expect(wrapper.instance().props.pageWithStickyFooter).toBe(true);
  });
});
