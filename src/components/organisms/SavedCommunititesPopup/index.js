import React from 'react';
import styled from 'styled-components';
import { array, func, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette, key } from 'sly/components/themes';
import { Icon, Hr } from 'sly/components/atoms';
import SavedCommunityTile from 'sly/components/molecules/SavedCommunityTile';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${palette('white', 'base')};
  height: 100%;
  overflow: auto;
  z-index: ${key('zIndexes.modal.overlay')};
  transform: ${ifProp('isOpen', 'translate3d(0, 0, 0)', 'translate3d(100%, 0, 0)')};
  transition: all ${key('transitions.slow.inOut')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col5')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    box-shadow: -${size('spacing.small')} 0 ${size('spacing.regular')} 0 ${palette('slate', 'base')}10;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex-direction: row;
  }
`;
const HeadingDiv = styled.div`
  order: 2;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: 0;
    display: flex;
  }
`;
// TODO: Fix icon size when applying new design
const CloseIcon = styled(Icon)`
  padding: ${size('spacing.small')};
  order: 1;
  :hover {
    cursor: pointer;
  }
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-left: auto;
    margin-bottom: initial;
  }
`;
CloseIcon.displayName = 'SavedCommunitiesPopup_CloseIcon';
const CommunitiesListWrapper = styled.div`
  padding: ${size('spacing.xLarge')};
`;
const SavedCommunityTileWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;
const StyledHr = styled(Hr)`
  margin: 0 ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin: initial;
  }
`;

const SavedCommunitiesPopup = ({
  savedCommunities, isLoading, isLoadSuccess, onCloseButtonClick, onFavouriteClicked, isOpen,
}) => {
  let savedCommunitiesComponent = 'Loading...';
  if (!isLoading) {
    if (isLoadSuccess) {
      if (savedCommunities.length > 0) {
        savedCommunitiesComponent = savedCommunities.map(savedCommunity => <SavedCommunityTileWrapper key={savedCommunity.id}><SavedCommunityTile {...savedCommunity} onFavouriteClicked={() => onFavouriteClicked(savedCommunity)} /></SavedCommunityTileWrapper>);
      } else {
        savedCommunitiesComponent = 'There are no Saved Communities.';
      }
    } else {
      savedCommunitiesComponent = 'Loading Saved Communities Failed.';
    }
  }

  return (
    <Wrapper isOpen={isOpen}>
      <HeadingWrapper>
        <HeadingDiv>Saved Communities</HeadingDiv>
        <CloseIcon icon="close" onClick={onCloseButtonClick} />
      </HeadingWrapper>
      <StyledHr />
      <CommunitiesListWrapper>
        {savedCommunitiesComponent}
      </CommunitiesListWrapper>
    </Wrapper>
  );
};

SavedCommunitiesPopup.propTypes = {
  savedCommunities: array,
  onCloseButtonClick: func.isRequired,
  onFavouriteClicked: func.isRequired,
  isLoading: bool,
  isLoadSuccess: bool,
  isOpen: bool,
};

SavedCommunitiesPopup.defaultProps = {
  savedCommunities: [],
  isOpen: true,
};

export default SavedCommunitiesPopup;
