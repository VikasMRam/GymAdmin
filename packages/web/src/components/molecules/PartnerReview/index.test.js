import React from 'react';
import { mount } from 'enzyme';

import PartnerReview from 'sly/web/components/molecules/PartnerReview';
import { Paragraph, Block } from 'sly/web/components/atoms';

const wrap = (props = {}) => mount(<PartnerReview {...props} />);

const image = 'https://avatars.githubusercontent.com/u/113003';
const review = 'test review';
const name = 'test name';
const location = 'test location';

describe('PartnerReview', () => {
  it('renders', () => {
    const wrapper = wrap({
      image,
      review,
      name,
      location,
    });
    expect(wrapper.find('div').find(Paragraph).text()).toContain(review);
    expect(wrapper.find('div').find(Block).at(0).text()).toContain(name);
    expect(wrapper.find('div').find(Block).at(1).text()).toContain(location);
  });
});
