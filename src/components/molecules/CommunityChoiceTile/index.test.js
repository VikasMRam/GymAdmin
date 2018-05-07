import React from 'react';
import { shallow } from 'enzyme';
import CommunityChoiceTile from '.';

import Checkbox from 'sly/components/molecules/Checkbox';

import parentCommunity from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties: { [0]: community } } = parentCommunity;

const wrap = (props = {}) =>
  shallow(<CommunityChoiceTile community={community} {...props} />);

describe('CommunityChoiceTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders the reviews', () => {
    const wrapper = wrap();
    const rating = wrapper.find('Rating');
    expect(rating.prop('value')).toEqual(community.propRatings.reviewsValue);
    const numReviews = rating.parent().dive().childAt(1);
    expect(numReviews.prop('children')).toEqual(community.propRatings.numReviews);
  });

  it('renders checkbox not checked', () => {
    const wrapper = wrap();
    const checkbox = wrapper.childAt(1);
    expect(checkbox.dive().type()).toBe(Checkbox);
    expect(wrapper.prop('selected')).toBe(false);
    expect(checkbox.prop('checked')).toBeFalsy();
  });

  it('renders checkbox checked', () => {
    const wrapper = wrap({ selected: true });
    const checkbox = wrapper.childAt(1);
    expect(checkbox.dive().type()).toBe(Checkbox);
    expect(wrapper.prop('selected')).toBe(true);
    expect(checkbox.prop('checked')).toEqual(true);
  });

});
