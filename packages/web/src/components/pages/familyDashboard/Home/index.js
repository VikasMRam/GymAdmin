import React from 'react';
import { arrayOf, object, func, bool, shape } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';
import pad from 'sly/web/components/helpers/pad';
import shadow from 'sly/web/components/helpers/shadow';
import Masonry from 'sly/web/components/common/Masonry';
import { Heading, Hr, Paragraph, Link, Block } from 'sly/common/components/atoms';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import SectionForm from 'sly/web/components/molecules/SectionForm';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import CommunityAgentSectionContainer from 'sly/web/containers/CommunityAgentSectionContainer';
import { textAlign } from 'sly/web/components/helpers/text';
import Grid from 'sly/common/components/atoms/Grid';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { MPLACE_RESOURCE_ARTICLE, MPLACE_RESOURCE_OFFER } from 'sly/web/constants/homeBase';
import MarketplaceResourceTile from 'sly/web/components/organisms/homeBase/MarketplaceResourceTile';
import ChecklistTile from 'sly/web/components/organisms/homeBase/ChecklistTile';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

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
// const StyledCommunityTile = shadow(styled(CommunityTile)`
//   position: relative;
// `);

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
  partnerAgent, city, state, homeBase, onBannerClose, showBanner, isLoading,
}) => {
  let communityTiles; let marketplaceOfferTiles; let
    resourceArticleTiles; let agent;
  if (!isLoading) {
    const { recommendedCommunities } = homeBase;
    communityTiles =
      recommendedCommunities.map((community) => {
        return (
          <StyledLink to={community.url} key={community.id}>
            <CommunityTile
              canFavourite
              isFavourite
              noGallery
              layout="column"
              key={community.id}
              community={community}
            />
          </StyledLink>
        );
      });
    // Create checklist
    const { client = {} } = homeBase;
    // Add partner agent info
    agent = homeBase.agent;
    // Add marketplace offers
    const { mplaceResources = [] } = homeBase;
    const resourceArticles = mplaceResources.filter((mplaceResource) => {
      return mplaceResource.type === MPLACE_RESOURCE_ARTICLE;
    });
    const mplaceOffers = mplaceResources.filter((mplaceResource) => {
      return mplaceResource.type === MPLACE_RESOURCE_OFFER;
    });
    if (resourceArticles.length > 0) {
      resourceArticleTiles = resourceArticles.map((ra) => {
        return (
          <StyledLink to={ra.ctaUrl} key={ra.id}>
            <MarketplaceResourceTile marketplaceResource={ra} />
          </StyledLink>
        );
      });
    }
    if (mplaceOffers.length > 0) {
      marketplaceOfferTiles = mplaceOffers.map((ra) => {
        return (
          <StyledLink to={ra.ctaUrl} key={ra.id}>
            <MarketplaceResourceTile marketplaceResource={ra} />
          </StyledLink>
        );
      });
    }
  }
  const itemList = [{ checked: true, text: 'Match with agent' }, { checked: true, text: 'Evaluate Options' },
    { checked: false, text: 'Schedule Tours' }, { checked: false, text: 'Move' }];
  const userName = 'Some user';
  return (
    <DashboardPageTemplate activeMenuItem="My Dashboard">
      {isLoading && 'Loading...'}
      {!isLoading &&
      <div>
        {showBanner &&
        <BannerNotification onCloseClick={onBannerClose}>
          <Block> Hi {userName}, Welcome to your dashboard </Block>
        </BannerNotification>
        }
        <Grid dimensions={['25%', '75%']} upToDesktop={{ gridTemplateColumns: 'auto !important' }} gap="large">
          <Grid gap="large" flow="row" height="fit-content">
            {agent &&
            <HeadingBoxSection maxHeight="100%" heading={`Your Local Senior Living Expert in ${city},${state}`} >
              <CommunityAgentSectionContainer agent={agent} pad="xLarge" />
            </HeadingBoxSection>
            }
            <HeadingBoxSection maxHeight="100%"  heading="Checklist">
              <ChecklistTile itemList={itemList} />
            </HeadingBoxSection>
          </Grid>
          <Grid gap="large" flow="row">
            <HeadingBoxSection overflow="auto" heading="Recommended communities for you">
              <Grid startingWithTablet={{ gridTemplateColumns: 'auto!important' }} gap="large" dimensions={['repeat(3,288px)']} overflow="auto">
                {communityTiles}
              </Grid>
            </HeadingBoxSection>
            <HeadingBoxSection overflow="auto" heading="Marketplace">
              <Grid startingWithTablet={{ gridTemplateColumns: 'auto!important' }} gap="large" dimensions={['repeat(3,288px)']} overflow="auto">
                {marketplaceOfferTiles}
              </Grid>
            </HeadingBoxSection>
            <HeadingBoxSection overflow="auto" heading="Resources">
              <Grid startingWithTablet={{ gridTemplateColumns: 'auto!important' }} gap="large" dimensions={['repeat(2,288px)']} overflow="auto">
                {resourceArticleTiles}
              </Grid>
            </HeadingBoxSection>
          </Grid>
        </Grid>
      </div>
      }
    </DashboardPageTemplate>
  );
};

FamilyHomePage.propTypes = {
  userSaves: arrayOf(object),
  homeBase: object,
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
