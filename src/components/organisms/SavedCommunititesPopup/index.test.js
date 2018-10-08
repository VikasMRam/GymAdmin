import React from 'react';
import { shallow } from 'enzyme';

import SavedCommunityTile from 'sly/components/molecules/SavedCommunityTile';
import SavedCommunitiesPopup from 'sly/components/organisms/SavedCommunititesPopup';

const userSave = {
  id: 1,
  name: 'Rhoda Goldman Plaza',
  image: 'image.url',
  note: 'Nice Place',
};

const onFavouriteClicked = jest.fn();
const onCloseButtonClick = jest.fn();

const wrap = (props = {}) => shallow(<SavedCommunitiesPopup {...props} onFavouriteClicked={onFavouriteClicked} onCloseButtonClick={onCloseButtonClick} />);

describe('SavedCommunitiesPopup', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({
      hasSlyReviews: true,
      hasWebReviews: true,
      children: 'test',
    });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders SavedCommunitiesPopup', () => {
    const wrapper = wrap({ isLoading: false, isLoadSuccess: true, savedCommunities: [userSave] });
    expect(wrapper.find(SavedCommunityTile)).toHaveLength(1);
  });

  it('renders Loading', () => {
    const wrapper = wrap({ isLoading: true });
    expect(wrapper.contains('Loading...')).toBeTruthy();
  });

  it('renders Loading Failed', () => {
    const wrapper = wrap({ isLoading: false, isLoadSuccess: false });
    expect(wrapper.contains('Loading Saved Communities Failed.')).toBeTruthy();
  });

  it('handles onCloseButtonClick', () => {
    const wrapper = wrap({ });
    const closeButton = wrapper.find('SavedCommunitiesPopup_CloseIcon');
    closeButton.simulate('click');
    expect(onCloseButtonClick).toHaveBeenCalled();
  });
});
