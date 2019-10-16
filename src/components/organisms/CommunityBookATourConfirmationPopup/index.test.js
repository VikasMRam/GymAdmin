import React from 'react';
import { shallow } from 'enzyme';

import CommunityBookATourConfirmationPopup from 'sly/components/organisms/CommunityBookATourConfirmationPopup';

const appointmentText = 'Saturday, October 21, Anytime';
const similarCommunititesHref = 'www.teamseniorly.com';
const onTileClick = jest.fn();
const heading = 'temp heading';
const subheading = 'temp subheading';

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  communityImageUrl: 'image.url',
  similarCommunities: [{
    id: 1,
    imageUrl: 'image.url',
    name: 'foo',
    estimatedRate: 123,
    startingRate: 100,
    reviewsValue: 4.235,
    numReviews: 2,
    addressString: 'San Francisco, CA',
  }],
  appointmentText,
  similarCommunititesHref,
  onTileClick,
  heading,
  subheading,
};

const wrap = (props = {}) => shallow(<CommunityBookATourConfirmationPopup {...defaultProps} {...props} />);

describe('CommunityBookATourConfirmationPopup', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
    expect(wrapper.contains(heading)).toBe(false);
    expect(wrapper.contains(subheading)).toBe(false);
  });

  it('handles onTileClick', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('StyledLink')).toHaveLength(1);
    const link = wrapper.find('StyledLink');
    link.simulate('click');
    expect(onTileClick).toHaveBeenCalledTimes(1);
  });
});
