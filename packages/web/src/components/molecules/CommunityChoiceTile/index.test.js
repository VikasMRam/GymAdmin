import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from 'sly/web/components/molecules/Checkbox';
import CommunityChoiceTile from 'sly/web/components/molecules/CommunityChoiceTile';
import parentCommunity from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties: { 0: community } } = parentCommunity;

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
    expect(rating.prop('value')).toEqual(community.reviewsValue);
    const numReviews = rating
      .parent()
      .dive()
      .childAt(1);
    expect(numReviews.prop('children')).toEqual(community.numReviews);
  });

  it('renders checkbox not checked', () => {
    const wrapper = wrap({ selectable: true });
    const checkbox = wrapper.childAt(1);
    expect(wrapper.prop('selected')).toBe(false);
    expect(checkbox.prop('checked')).toBeFalsy();
  });

  it('renders checkbox checked', () => {
    const wrapper = wrap({ selected: true, selectable: true });
    const checkbox = wrapper.childAt(1);
    expect(wrapper.prop('selected')).toBe(true);
    expect(checkbox.prop('checked')).toEqual(true);
  });

  it('does not render checkbox when non selectable', () => {
    const wrapper = wrap({ selected: true, selectable: false });
    const checkbox = wrapper.childAt(1);
    expect(checkbox.dive().type()).not.toBe(Checkbox);
    expect(wrapper.prop('selected')).toBe(false); // Selected must be false if selectable is false
    expect(wrapper.prop('selectable')).toBe(false);
  });
});
