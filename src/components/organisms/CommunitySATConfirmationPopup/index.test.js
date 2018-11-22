import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATConfirmationPopup from 'sly/components/organisms/CommunitySATConfirmationPopup';
import { Link } from 'sly/components/atoms/index';

const appointmentText = 'Saturday, October 21, Anytime';
const similarCommunititesHref = 'www.teamseniorly.com';
const onTileClick = jest.fn();
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
  }],
  appointmentText,
  similarCommunititesHref,
  onTileClick,
};

const wrap = (props = {}) => shallow(<CommunitySATConfirmationPopup {...defaultProps} {...props} />);

describe('CommunitySATConfirmationPopup', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('handles onTileClick', () => {
    const wrapper = wrap();
    expect(wrapper.find('Styled(Link)')).toHaveLength(1);
    const link = wrapper.find('Styled(Link)');
    link.simulate('click');
    expect(onTileClick).toHaveBeenCalledTimes(1);
  });
});
