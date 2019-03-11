import React, { Fragment } from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import styled from 'styled-components';

import SlyEvent from 'sly/services/helpers/events';
import { size, assetPath } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import Masonry from 'sly/components/common/masonry';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import { Heading, Paragraph, Hr } from 'sly/components/atoms';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import FormSection from 'sly/components/molecules/FormSection';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';

const columnCounts = [
  {
    from: 0,
    to: 767,
    count: 1,
  },
  {
    from: 768,
    to: 1283,
    count: 2,
  },
  {
    from: 1284,
    to: 1847,
    count: 3,
  },
  {
    from: 1848,
    to: 2559,
    count: 4,
  },
  {
    from: 2560,
    to: 5000,
    count: 5,
  },
];

// to prevent community tile's gallery causing overlap which prevents hover from working
const StyledCommunityTile = styled(CommunityTile)`
  position: relative;
`;

const Wrapper = styled.div`
  max-width: ${size('layout.col8')};
  margin-left: auto;
  margin-right: auto;
`;

const SearchBoxWrapper = pad(styled.div`
  max-width: ${size('layout.col5')};
  margin-left: auto;
  margin-right: auto;
`, 'xxLarge');

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.xLarge')};
  margin-right: -${size('spacing.xLarge')};
`;

const PaddedHeading = pad(textAlign(Heading), 'regular');
const SlyVideoHeading = pad(textAlign(Heading), 'large');
const PaddedParagraph = pad(textAlign(Paragraph), 'xLarge');

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const DashboardFavoritesPage = ({
  userSaves, onGallerySlideChange, currentGalleryImage, notifyInfo, showModal, hideModal,
  onLocationSearch, ishowSlyWorksVideoPlaying, toggleHowSlyWorksVideoPlaying,
}) => {
  const communityTiles = userSaves ? userSaves.map((userSave) => {
    const { community, id } = userSave;
    const onSlideChange = i => onGallerySlideChange(id, i);
    const currentSlide = currentGalleryImage[id];
    const openAskAgentQuestionModal = () => {
      const { addressString, name } = community;
      const [, city] = addressString.split(',');
      const { heading, placeholder, question } = generateAskAgentQuestionContents(name, city);
      const agentImageUrl = assetPath('images/agent-xLarge.png');

      const toggleAskAgentQuestionModal = () => {
        hideModal();
      };

      const modalComponentProps = {
        toggleAskAgentQuestionModal,
        notifyInfo,
        community,
        heading,
        agentImageUrl,
        placeholder,
        question,
      };

      showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />);
    };
    const actionButtons = [
      {
        text: 'Ask Question',
        onClick: openAskAgentQuestionModal,
      },
    ];

    return (
      <StyledCommunityTile
        addNote
        isFavourite
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        key={userSave.id}
        community={userSave.community}
        actionButtons={actionButtons}
        note={userSave.info.note}
      />
    );
  }) : 'loading...';

  return (
    <DashboardPageTemplate>
      <FormSection heading="Favorites">
        {communityTiles.length &&
          <Masonry columnCounts={columnCounts}>
            {communityTiles}
          </Masonry>
        }
        {!communityTiles.length &&
          <Fragment>
            <Wrapper>
              <PaddedHeading size="subtitle" weight="regular">You haven’t saved any communities yet.</PaddedHeading>
              <PaddedParagraph size="caption">Add communities to your saved list to organize and compare which options are the best fit for you.</PaddedParagraph>
              <SearchBoxWrapper>
                <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
              </SearchBoxWrapper>
            </Wrapper>
            <StyledHr />
            <Wrapper>
              <SlyVideoHeading size="subtitle" weight="regular">Learn about Seniorly</SlyVideoHeading>
              <HowSlyWorksVideo
                isPlaying={ishowSlyWorksVideoPlaying}
                onThumbnailClick={toggleHowSlyWorksVideoPlaying}
                onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', 'dashboard-family-favorites', e.target.currentTime)}
                onPlay={e => sendEvent('howSlyWorksVideo', 'play', 'dashboard-family-favorites', e.target.currentTime)}
              />
            </Wrapper>
          </Fragment>
        }
      </FormSection>
    </DashboardPageTemplate>
  );
};

DashboardFavoritesPage.propTypes = {
  userSaves: arrayOf(object),
  onGallerySlideChange: func,
  currentGalleryImage: object,
  notifyInfo: func,
  showModal: func,
  hideModal: func,
  onLocationSearch: func,
  ishowSlyWorksVideoPlaying: bool,
  toggleHowSlyWorksVideoPlaying: func,
};

export default DashboardFavoritesPage;
