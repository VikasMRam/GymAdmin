import React from 'react';
import { shallow } from 'enzyme';

import PartnerReview from '.';

const wrap = (props = {}) => shallow(<PartnerReview {...props} />);

const image = 'https://avatars.githubusercontent.com/u/113003';
const review = 'test review';
const name = 'test name';
const location = 'test location';

describe('PartnerReview', () => {
  it.skip('renders', () => {
    const wrapper = wrap({
      image,
      review,
      name,
      location,
    });
    expect(wrapper.find('div').find('Paragraph').text()).toContain(review);
    expect(wrapper.find('div').find('Block').at(0).text()).toContain(name);
    expect(wrapper.find('div').find('Block').at(1).text()).toContain(location);
  });
});
