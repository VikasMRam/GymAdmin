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
    expect(wrapper.find('Styled(Button)').contains('Tour requested')).toBe(true);
  });

  it('renders with isAlreadyPricingRequested', () => {
    const wrapper = wrap({ isAlreadyPricingRequested: true });
    expect(wrapper.find('MainButton').contains('Pricing requested')).toBe(true);
  });

  it('does handles onBookATourClick', () => {
    const onBookATourClick = jest.fn();
    const wrapper = wrap({ onBookATourClick });
    const BookATourButton = wrapper.find('Styled(Button)');

    expect(BookATourButton).toHaveLength(2);
    BookATourButton.at(1).simulate('click');
    expect(onBookATourClick).toHaveBeenCalled();
  });

  it('does handles onGCPClick', () => {
    const onGCPClick = jest.fn();
    const wrapper = wrap({ onGCPClick });
    const GCPButton = wrapper.find('MainButton');

    expect(GCPButton).toHaveLength(1);
    GCPButton.simulate('click');
    expect(onGCPClick).toHaveBeenCalled();
  });

  it('does handles onAQClick', () => {
    const onAQClick = jest.fn();
    const wrapper = wrap({ onAQClick });
    const AQButton = wrapper.find('Styled(Button)');

    expect(AQButton).toHaveLength(2);
    AQButton.at(0).simulate('click');
    expect(onAQClick).toHaveBeenCalled();
  });
});
