import React from 'react';
import { shallow } from 'enzyme';

import PartnerReview from 'sly/components/molecules/PartnerReview';
import { Paragraph, Block } from 'sly/components/atoms';

const wrap = (props = {}) => shallow(<PartnerReview {...props} />);

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
    expect(wrapper.find('div').find(Paragraph).dive().dive()
      .text()).toContain(review);
    expect(wrapper.find('div').find(Block).at(0).dive()
      .text()).toContain(name);
    expect(wrapper.find('div').find(Block).at(1).dive()
      .text()).toContain(location);
  });
});
