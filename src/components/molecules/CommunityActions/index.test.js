import React from 'react';
import { shallow } from 'enzyme';

import CommunityActions from 'sly/components/molecules/CommunityActions';

const wrap = (props = {}) =>
  shallow(<CommunityActions {...props} />);

describe('CommunityActions', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders with isAlreadyTourScheduled', () => {
    const wrapper = wrap({ isAlreadyTourScheduled: true });
    expect(wrapper.find('BookATourButton').contains('Tour requested')).toBe(true);
  });

  it('renders with isAlreadyPricingRequested', () => {
    const wrapper = wrap({ isAlreadyPricingRequested: true });
    expect(wrapper.find('GetCustomPriceButton').contains('Pricing requested')).toBe(true);
  });

  it('does handles onBookATourClick', () => {
    const onBookATourClick = jest.fn();
    const wrapper = wrap({ onBookATourClick });
    const BookATourButton = wrapper.find('BookATourButton');

    expect(BookATourButton).toHaveLength(1);
    BookATourButton.simulate('click');
    expect(onBookATourClick).toHaveBeenCalled();
  });

  it('does handles onGCPClick', () => {
    const onGCPClick = jest.fn();
    const wrapper = wrap({ onGCPClick });
    const GCPButton = wrapper.find('GetCustomPriceButton');

    expect(GCPButton).toHaveLength(1);
    GCPButton.simulate('click');
    expect(onGCPClick).toHaveBeenCalled();
  });

  it('does handles onAQClick', () => {
    const onAQClick = jest.fn();
    const wrapper = wrap({ onAQClick });
    const AQButton = wrapper.find('AskQuestionButton');

    expect(AQButton).toHaveLength(1);
    AQButton.simulate('click');
    expect(onAQClick).toHaveBeenCalled();
  });
});
