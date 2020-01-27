import React from 'react';
import { shallow } from 'enzyme';

import GetHelpNow from 'sly/components/organisms/GetHelpNow';

const wrap = (props = {}) => shallow(<GetHelpNow {...props} />);

describe('GetHelpNow', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('Field').filter({ name: 'what' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('Block')).toHaveLength(1);
  });

  it('calls onPhoneClick', () => {
    const onPhoneClick = jest.fn();
    const wrapper = wrap({
      onPhoneClick,
    });

    wrapper.find('Block').find('Link').simulate('click');
    expect(onPhoneClick).toHaveBeenCalled();
  });
});
