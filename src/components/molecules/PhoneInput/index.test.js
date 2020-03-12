import React from 'react';
import { mount } from 'enzyme';

import PhoneInput from 'sly/components/molecules/PhoneInput/index';

const wrap = (props = {}) => mount(<PhoneInput {...props} />);

const lastCall = ({ mock }) => mock.calls[mock.calls.length - 1];

describe('PhoneInput', () => {
  it('renders input by default', () => {
    const wrapper = wrap();
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
  });

  it('accepts a phone and formats it', () => {
    const onChange = jest.fn();
    const wrapper = wrap({
      name: 'phone',
      value: '12345',
      onChange,
    });
    const input = wrapper.find('input[name="phone"]');
    expect(input.prop('value')).toEqual('123-45');

    input.simulate('change', { target: { value: '123-456-7890' } });
    expect(lastCall(onChange)[0].target.value).toEqual('1234567890');
  });
});
