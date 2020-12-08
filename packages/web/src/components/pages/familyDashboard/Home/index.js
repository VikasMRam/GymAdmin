import React from 'react';
import { arrayOf, object, func, bool, shape } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';
import pad from 'sly/web/components/helpers/pad';
import shadow from 'sly/web/components/helpers/shadow';
import Masonry from 'sly/web/components/common/Masonry';
import { Heading, Hr, Paragraph, Link } from 'sly/common/components/atoms';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import SectionForm from 'sly/web/components/molecules/SectionForm';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import CommunityAgentSectionContainer from 'sly/web/containers/CommunityAgentSectionContainer';
import { textAlign } from 'sly/web/components/helpers/text';
import Grid from 'sly/common/components/atoms/Grid';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

// to prevent community tile's gallery causing overlap which prevents hover from working
const StyledCommunityTile = shadow(styled(CommunityTile)`
  position: relative;
`);

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

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const FamilyHomePage = ({
  partnerAgent, city, state, userSaves, onGallerySlideChange, currentGalleryImage, onLocationSearch, ishowSlyWorksVideoPlaying,
  toggleHowSlyWorksVideoPlaying, clickHandlers, isLoading,
}) => {
  let communityTiles;

  if (!isLoading) {
    communityTiles =
      userSaves.map((userSave, i) => {
        const { community, id } = userSave;
        const onSlideChange = i => onGallerySlideChange(id, i);
        const currentSlide = currentGalleryImage[id];
        const actionButtons = [
          {
            text: 'Ask Question',
            onClick: clickHandlers[i].openAskAgentQuestionModal,
          },
        ];

        return (
          <StyledLink to={community.url} key={community.id}>
            <StyledCommunityTile
              addNote
              canFavourite
              isFavourite
              currentSlide={currentSlide}
              onSlideChange={onSlideChange}
              key={userSave.id}
              community={userSave.community}
              actionButtons={actionButtons}
              note={userSave.info.note}
              width="100%"
              onAddNoteClick={clickHandlers[i].openNoteModification}
              onEditNoteClick={clickHandlers[i].openNoteModification}
              onUnfavouriteClick={clickHandlers[i].onUnfavouriteClick}
            />
          </StyledLink>
        );
      });
  }

  return (
    <DashboardPageTemplate activeMenuItem="My Dashboard">
      <Grid dimensions={['25%', '75%']} upToDesktop={{ gridTemplateColumns: 'auto !important' }} gap="large">
        <Grid gap="large" flow="row">
          {partnerAgent &&
          <HeadingBoxSection heading={`Your Local Senior Living Expert in ${city},${state}`} >
            <CommunityAgentSectionContainer agent={partnerAgent} pad="xLarge" />
          </HeadingBoxSection>
          }
          <HeadingBoxSection heading="Checklist">
            Your Checklist
          </HeadingBoxSection>
        </Grid>
        <Grid gap="large" flow="row">
          <HeadingBoxSection heading="Recommended communities for you">
            {communityTiles}
          </HeadingBoxSection>
          <HeadingBoxSection heading="Resources">
            Resources for you
          </HeadingBoxSection>
          <HeadingBoxSection heading="Marketplace">
            Marketplace
          </HeadingBoxSection>
        </Grid>
      </Grid>

      {/* <SectionForm heading="Recommended Communities"> */}
      {/*  {isLoading && 'Loading...'} */}
      {/*  {!isLoading && communityTiles.length > 0 && */}
      {/*  <Masonry columnCounts={columnCounts}> */}
      {/*    {communityTiles} */}
      {/*  </Masonry> */}
      {/*  } */}
      {/*  {!isLoading && !communityTiles.length && */}
      {/*  <> */}
      {/*    <Wrapper> */}
      {/*      <PaddedHeading size="subtitle" weight="regular">You haven&apos;t saved any communities yet.</PaddedHeading> */}
      {/*      <Paragraph align="center" pad="xLarge" size="caption"> */}
      {/*        Add communities to your saved list to organize and compare which options are the best fit for you. */}
      {/*      </Paragraph> */}
      {/*      <SearchBoxWrapper> */}
      {/*        <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} /> */}
      {/*      </SearchBoxWrapper> */}
      {/*    </Wrapper> */}
      {/*    <StyledHr /> */}
      {/*    <Wrapper> */}
      {/*      <SlyVideoHeading size="subtitle" weight="regular">Learn about Seniorly</SlyVideoHeading> */}
      {/*      <HowSlyWorksVideo */}
      {/*        isPlaying={ishowSlyWorksVideoPlaying} */}
      {/*        onThumbnailClick={toggleHowSlyWorksVideoPlaying} */}
      {/*        onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', 'dashboard-family-favorites', e.target.currentTime)} */}
      {/*        onPlay={e => sendEvent('howSlyWorksVideo', 'play', 'dashboard-family-favorites', e.target.currentTime)} */}
      {/*      /> */}
      {/*    </Wrapper> */}
      {/*  </> */}
      {/*  } */}
      {/* </SectionForm> */}

    </DashboardPageTemplate>
  );
};

FamilyHomePage.propTypes = {
  userSaves: arrayOf(object),
  onGallerySlideChange: func,
  currentGalleryImage: object,
  onLocationSearch: func,
  ishowSlyWorksVideoPlaying: bool,
  toggleHowSlyWorksVideoPlaying: func,
  isLoading: bool,
  clickHandlers: arrayOf(shape({
    openAskAgentQuestionModal: func.isRequired,
    openNoteModification: func.isRequired,
    onUnfavouriteClick: func.isRequired,
  })),
};

export default FamilyHomePage;
