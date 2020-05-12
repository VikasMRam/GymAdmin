import React from 'react';
import { shallow } from 'enzyme';

import InteractiveDetail from 'sly/web/components/molecules/InteractiveDetail';

const label = 'test';
const phone = 1234567890;
const email = 'test@test.com';
const defaultProps = {
  label,
};
const wrap = (props = {}) => shallow(<InteractiveDetail {...defaultProps} {...props} />);

describe('InteractiveDetail', () => {
  it('renders phone', () => {
    const wrapper = wrap({
      detail: {
        type: 'phone',
        value: phone,
      },
    });

    expect(wrapper.find('Label')).toHaveLength(1);
    expect(wrapper.find('Label').contains(label)).toBeTruthy();
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Link').prop('href')).toBe(`tel:${phone}`);
  });

  it('renders email', () => {
    const wrapper = wrap({
      detail: {
        type: 'email',
        value: email,
      },
    });

    expect(wrapper.find('Label')).toHaveLength(1);
    expect(wrapper.find('Label').contains(label)).toBeTruthy();
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Link').prop('href')).toBe(`mailto:${email}`);
  });
});
