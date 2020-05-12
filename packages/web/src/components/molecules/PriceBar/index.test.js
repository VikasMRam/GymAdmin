import React from 'react';
import { mount } from 'enzyme';

import PriceBar from 'sly/components/molecules/PriceBar';

const wrap = (props = {}) => mount(<PriceBar {...props} />);

const width = 60;
const price200 = 200;
const price200Formatted = '$200';
const price2000 = 2000;
const price2000Formatted = '$2,000';
const price20000 = 20000;
const price20000Formatted = '$20,000';

describe('PriceBar', () => {
  it('verify correct price format - $200', () => {
    const wrapper = wrap({ width, price: price200 });
    expect(wrapper.text()).toEqual(price200Formatted);
  });

  it('verify correct price format - $2000', () => {
    const wrapper = wrap({ width, price: price2000 });
    expect(wrapper.text()).toEqual(price2000Formatted);
  });

  it('verify correct price format - $20000', () => {
    const wrapper = wrap({ width, price: price20000 });
    expect(wrapper.text()).toEqual(price20000Formatted);
  });
});
