import React from 'react';
import { object, func, bool } from 'prop-types';
import styled from 'styled-components';

import { Link, Button } from 'sly/common/components/atoms';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import CommunityAgentSectionContainer from 'sly/web/containers/CommunityAgentSectionContainer';
import Grid from 'sly/common/components/atoms/Grid';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { MPLACE_RESOURCE_ARTICLE, MPLACE_RESOURCE_OFFER } from 'sly/web/constants/homeBase';
import MarketplaceResourceContentTile from 'sly/web/components/organisms/homeBase/MarketplaceResourceContentTile';
import MarketplaceResourceOfferTile from 'sly/web/components/organisms/homeBase/MarketplaceResourceOfferTile';
import ChecklistTile from 'sly/web/components/organisms/homeBase/ChecklistTile';
import WelcomeBanner from 'sly/web/components/organisms/homeBase/WelcomeBanner';
import { getChecklistItems } from 'sly/web/services/helpers/homeBase';


const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const FamilyHomePage = ({
  homeBase, uuidAux, onBannerClose,  showBanner, onMarketplaceTileClick, isLoading, openAskAgentQuestionModal,
  welcomeBannerContent,
}) => {
  let communityTiles; let marketplaceOfferTiles; let
    resourceArticleTiles; let itemList; let agent; let city; let state;

  if (!isLoading) {
    const { uuidInfo: { locationInfo } } = uuidAux;
    city = locationInfo.city;
    state  = locationInfo.state;
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
    // Get Agent
    agent = homeBase.agent;
    // Create checklist
    itemList = getChecklistItems(homeBase, uuidAux);

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
          <MarketplaceResourceContentTile
            marketplaceResource={ra}
            key={ra.id}
            onClick={(evt) => {
            onMarketplaceTileClick(evt, { category: 'resource', value: ra.ctaUrl, label: ra.id });
            }}
          />

        );
      });
    }
    if (mplaceOffers.length > 0) {
      marketplaceOfferTiles = mplaceOffers.map((ra) => {
        return (
          <MarketplaceResourceOfferTile
            marketplaceResource={ra}
            key={ra.id}
            onClick={(evt) => {
            onMarketplaceTileClick(evt, { category: 'offer', value: ra.ctaUrl, label: ra.id });
            }}
          />
        );
      });
    }
  }


  return (
    <DashboardPageTemplate activeMenuItem="My Dashboard">
      {isLoading && 'Loading...'}
      {!isLoading &&
      <div>
        {showBanner && <WelcomeBanner onClose={onBannerClose} {...welcomeBannerContent} /> }
        <Grid dimensions={['33%', '67%']} upToTablet={{ gridTemplateColumns: 'auto !important' }} gap="large">
          <Grid gap="large" flow="row" height="fit-content">
            {agent &&
            <HeadingBoxSection maxHeight="100%" heading={`Your Seniorly Local Advisor in ${city},${state}`} >
              <CommunityAgentSectionContainer layout="homeBase" agent={agent} pad="xLarge" />
              <Button onClick={openAskAgentQuestionModal}> Ask {agent.name} a question</Button>
            </HeadingBoxSection>
            }
            <HeadingBoxSection maxHeight="100%"  heading="Your senior living checklist">
              <ChecklistTile itemList={itemList} />
            </HeadingBoxSection>
          </Grid>
          <Grid gap="large" flow="row">
            <HeadingBoxSection overflow="auto" heading="Explore communities recommended just for you">
              <Grid startingWithTablet={{ gridTemplateColumns: 'auto!important' }} gap="large" dimensions={['repeat(3,288px)']} overflow="auto">
                {communityTiles}
              </Grid>
            </HeadingBoxSection>
            <HeadingBoxSection overflow="auto" heading="Services to help you with your transition">
              <Grid startingWithTablet={{ gridTemplateColumns: 'auto!important' }} gap="large" dimensions={['repeat(3,288px)']} overflow="auto">
                {marketplaceOfferTiles}
              </Grid>
            </HeadingBoxSection>
            <HeadingBoxSection overflow="auto" heading="Senior living articles recommended for you">
              <Grid gap="large" startingWithTablet={{ gridTemplateColumns: 'repeat(2,40%) !important' }} dimensions={['repeat(4,288px)']}overflow="auto">
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
  uuidAux: object,
  welcomeBannerContent: object,
  onBannerClose: func,
  showBanner: bool,
  onMarketplaceTileClick: func,
  openAskAgentQuestionModal: func,
  isLoading: bool,
};

export default FamilyHomePage;
