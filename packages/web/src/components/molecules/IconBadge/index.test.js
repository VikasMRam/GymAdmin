import React from 'react';
import { shallow } from 'enzyme';

import IconBadge from 'sly/web/components/molecules/IconBadge';

const wrap = (props = {}) => shallow(<IconBadge icon="hourglass" {...props} />);

describe('IconBadge', () => {
  it('renders', () => {
    const text = 'test';
    const wrapper = wrap({ text });

    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.contains(text)).toBeTruthy();
  });
});
