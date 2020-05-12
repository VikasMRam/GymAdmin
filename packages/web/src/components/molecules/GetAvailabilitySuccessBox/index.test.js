import React from 'react';
import { shallow } from 'enzyme';

import GetAvailabilitySuccessBox from 'sly/web/components/molecules/GetAvailabilitySuccessBox';

const wrap = (props = {}) => shallow(<GetAvailabilitySuccessBox {...props} />);

describe('GetAvailabilitySuccessBox', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('Block').contains('We received your request, check your inbox shortly.')).toBe(true);
  });

  it('renders with hasAllUserData', () => {
    const wrapper = wrap({ hasAllUserData: true });
    expect(wrapper.find('Block').contains('Your Seniorly Guide will reach out to you regarding this community.')).toBe(true);
  });
});
