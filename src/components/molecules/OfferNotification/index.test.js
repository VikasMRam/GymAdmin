import React from 'react';
import { shallow } from 'enzyme';

import OfferNotification from 'sly/components/molecules/OfferNotification';

const title = 'test title';
const wrap = (props = {}) =>
  shallow(<OfferNotification title={title} {...props} />);

// todo: add tests
describe('OfferNotification', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });
});
