import React from 'react';
import { arrayOf, object, func, bool, shape } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';
import pad from 'sly/web/components/helpers/pad';
import shadow from 'sly/web/components/helpers/shadow';
import Masonry from 'sly/web/components/common/Masonry';
import { Heading, Hr, Paragraph, Link, Block, Button } from 'sly/common/components/atoms';
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
import { assetPath } from 'sly/web/components/themes';

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;


const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});


const FamilyHomePage = ({
  homeBase, onBannerClose, city, state, showBanner, onMarketplaceTileClick, isLoading, openAskAgentQuestionModal,
}) => {
  let communityTiles; let marketplaceOfferTiles; let
    resourceArticleTiles; let client; let agent;

  if (!isLoading) {
    const { recommendedCommunities } = homeBase;
    communityTiles =
      recommendedCommunities.map((community) => {
        return (
          <StyledLink to={community.url} key={community.id}>
            <CommunityTile
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
    client = homeBase.client;
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
          <StyledLink
            onClick={(evt) => {
            onMarketplaceTileClick(evt, { category: 'resource', value: ra.ctaUrl, label: ra.id });
            }}
            to={ra.ctaUrl}
            key={ra.id}
          >
            <MarketplaceResourceTile marketplaceResource={ra} />
          </StyledLink>
        );
      });
    }
    if (mplaceOffers.length > 0) {
      marketplaceOfferTiles = mplaceOffers.map((ra) => {
        return (
          <StyledLink
            onClick={(evt) => {
            onMarketplaceTileClick(evt, { category: 'offer', value: ra.ctaUrl, label: ra.id });
            }}
            to={ra.ctaUrl}
            key={ra.id}
          >
            <MarketplaceResourceTile marketplaceResource={ra} />
          </StyledLink>
        );
      });
    }
  }
  // Move to checklist options
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
          <Block size="subtitle"> Hi {userName}, Welcome to your dashboard </Block>
          <ResponsiveImage aspectRatio="3:2" src={assetPath('images/home-base/welcome.png')} />
        </BannerNotification>
        }
        <Grid dimensions={['25%', '75%']} upToDesktop={{ gridTemplateColumns: 'auto !important' }} gap="large">
          <Grid gap="large" flow="row" height="fit-content">
            {agent &&
            <HeadingBoxSection maxHeight="100%" heading={`Your Local Senior Living Expert in ${city},${state}`} >
              <CommunityAgentSectionContainer agent={agent} pad="xLarge" />
              <Button onClick={openAskAgentQuestionModal}> Ask {agent.name} a question</Button>
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
  homeBase: object,
  onBannerClose: func,
  showBanner: bool,
  onMarketplaceTileClick: func,
  openAskAgentQuestionModal: func,
  isLoading: bool,
};

export default FamilyHomePage;
