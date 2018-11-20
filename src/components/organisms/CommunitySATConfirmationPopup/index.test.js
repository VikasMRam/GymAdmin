import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATConfirmationPopup from 'sly/components/organisms/CommunitySATConfirmationPopup';

const appointmentText = 'Saturday, October 21, Anytime';
const onButtonClick = jest.fn();
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
  onButtonClick,
};

const wrap = (props = {}) => shallow(<CommunitySATConfirmationPopup {...defaultProps} {...props} />);

describe('CommunitySATConfirmationPopup', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
