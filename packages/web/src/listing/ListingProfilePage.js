import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';


import ListingActivitiesSection from './containers/ListingActivitiesSection';
import LazyListingMapContainer from './containers/LazyLististingMapContainer';

import { stateNames } from 'sly/web/constants/geo';
import { withHydration } from 'sly/web/services/partialHydration';
import { size } from 'sly/common/components/themes';
import Section from 'sly/web/components/molecules/Section';
import { PROFILE_VIEWED } from 'sly/web/services/api/constants';
import { getBreadCrumbsForListing } from 'sly/web/services/helpers/url';
import pad from 'sly/web/components/helpers/pad';
import { color, space, sx$tablet, sx$laptop, Hr, sx, Block, font, Paragraph, layout, Button, Link, Grid, Span } from 'sly/common/system';
import {
  ListingProfilePageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
  makeHeader,
  makeTwoColumn,
  makeWrapper,
} from 'sly/web/listing/templates/ListingProfilePageTemplate';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import ModalContainer from 'sly/web/containers/ModalContainer';
import PlusBranding from 'sly/web/listing/components/PlusBranding';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { Food } from 'sly/common/icons';
import { getAgentFirstName } from 'sly/web/services/helpers/agents';
import SimilarListings from 'sly/web/listing/components/SimilarListings';

const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const ListingMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingMediaGallery" */ 'sly/web/listing/ListingMediaGallery/ListingMediaGalleryContainer'));
const ListingSummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingSummary" */ 'sly/web/listing/containers/ListingSummaryContainer'));
const ApartmentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkApartmentSection" */ 'sly/web/listing/components/ApartmentSection'));
const ListingCommunityContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ './containers/ListngCommunityContainer'));
const CommunityAgentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityAgentSection" */ 'sly/web/components/molecules/CommunityAgentSection'));
const ListingReviewsContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ 'sly/web/listing/containers/ListingReviewsContainer'));
const ListingAgentButtonConatiner = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ 'sly/web/listing/containers/ListingAgentButtonContainer'));
const ListingAgentQuestionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ 'sly/web/listing/containers/ListingAgentQuestionContainer'));
const CarouselContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCarouselContainer" */ 'sly/web/containers/CarouselContainer'));

const StyledListingSummary = styled(ListingSummaryContainer)`
  
  position: relative;
  background: ${color('white.base')};
  z-index: 1;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-top: 0;
    position: initial;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const StyledSection = styled(Section)`
  padding:${space('l')} ${space('m')} ;
  margin-left:auto;
  margin-right:auto;
  background:${color('white.base')};
  font:${font('body-l')};
`;

const StickToTop = styled.div`
  position: sticky;
  top: 74px;
  margin-bottom: 50px;
  background-color: #fff;
  z-index: 99;
  border: 0.1px solid #e7e8ea;
  border-radius: 0.4em;
  ${sx({
    padding: 'l l',
  })}
`;

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('s')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
  }))}

  ${sx$laptop({
    paddingX: '0',
  })}
  font:${font('body-l')};
`;

const Header = makeHeader();
const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');
const Wrapper = makeWrapper('div');

const getSectionDetails = (sectionType, sections) => {
  const currentSection = sections.filter(section => section.type === sectionType);
  if (currentSection.length && currentSection[0].content) {
    return currentSection[0];
  }
  return null;
};

@withRouter
export default class ListingDetailPage extends PureComponent {
  static propTypes = {
    listing: object.isRequired,
    location: object.isRequired,
  };

  render() {
    const {
      listing,
      location,
      history,
    } = this.props;

    const {
      name,
      info = {},
      address,
      community,
      id,
      user: listingUser,
      gallery = {},
      user: communityUser,
      reviews,
      partnerAgent,
      similarListings,
    } = listing;

    const showMoreImages = gallery.images && gallery.images.length > 0;


    const {
      description,
      activities,
      activityCalendarURL,
    } = (info || {});


    const {
      line1, line2, city, state, zip,
    } = address;
    const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
      .replace(/, null,/g, ',')
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');


    const diningSection = getSectionDetails('dining', listing?.info?.sections || []);
    const neighborhoodSection = getSectionDetails('neighborhood', listing?.info?.sections || []);
    const communitySection  = getSectionDetails('community', listing?.info?.sections || []);

    const bookTourClickHandler = () => {
      console.log('tour');
      const win = window.open('https://calendly.com/conciergebyseniorly/introductory-call-lake-shore-drive?utm_campaign=ILCalendly&utm_source=optimize&utm_medium=test&month=2021-07', '_blank');
      if (win != null) {
        win.focus();
      }
    };
    const nearByOptionsClickHandler = () => {
      history.push(`/assisted-living/${stateNames[state]}/${city}`);
    };

    const similarListingStyle = {
      layout: 'row',
      imageSize: 'regular',
      showDescription: true,
    };


    return (
      <>
        <ModalContainer />
        <PageViewActionContainer actionType={PROFILE_VIEWED} actionInfo={{ slug: listing.id }} />
        <Block pad="m">
          <Header noBottomMargin />
        </Block>
        <Block mx="m" sx$tablet={{ width: 'col8', mx: 'l' }} sx$laptop={{ width: 'col12', mx: 'auto' }}>
          <BreadCrumb pad="m" background="white.base" items={getBreadCrumbsForListing({ name, info, address })} />
        </Block>
        <Block id="gallery" mb="l" sx$laptop={{ width: 'col12', mx: 'auto' }}>
          <ListingMediaGalleryContainer />
        </Block>
        <ListingProfilePageTemplate>
          <Wrapper>
            <TwoColumn>
              <Body>
                <StyledListingSummary formattedAddress={formattedAddress} />
                {description && (
                <Block background="white.base" pb="l" mb="xs" px="m" sx$laptop={{ px: '0' }} font="body-l" dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <PlusBranding />
                {/* Partner Agent */}
                {partnerAgent && (
                <>
                  <StyledHeadingBoxSection id="agent-section" heading="Have questions? Our Seniorly Local Advisors are ready to help you." mb="xs" sx$tablet={{ paddingTop: 'xxl' }}>
                    <CommunityAgentSection agent={partnerAgent} pad="l" />
                    <ListingAgentButtonConatiner
                      agent={partnerAgent}
                      width="100%"
                      listing={listing}
                      type="expert"
                      ctaText={`Talk to ${getAgentFirstName(partnerAgent)} about your options`}
                    />
                  </StyledHeadingBoxSection>
                </>
                )}
                {showMoreImages && (
                <StyledHeadingBoxSection id="apartment-section" heading="The apartment" mb="xs">
                  <ApartmentSection />
                  <Paragraph paddingTop="xl">Please note: The layout, furniture, and decor of your space may vary from what's show here.</Paragraph>
                </StyledHeadingBoxSection>
                )}
                {/* Activities */}
                {
                 activities && <ListingActivitiesSection activities={activities}  activityCalendarURL={activityCalendarURL} />
                }
                {/* Dining */}
                {
                  diningSection &&
                  <>
                    <StyledHeadingBoxSection mb="xs"  heading="Dining" >
                      <Block background="white.base" dangerouslySetInnerHTML={{ __html: diningSection.content }} />
                      {
                        diningSection.url &&
                        <Link href={diningSection.url}>
                          <Button sx$tablet={{ paddingX: 's' }}  variant="neutral" width="100%" mt="l">
                            <Food mr="xs" />View sample weekly menu
                          </Button>
                        </Link>
                      }

                    </StyledHeadingBoxSection>
                  </>
                }

                {/* Neighborhood */}
                {
                  neighborhoodSection &&
                  <>
                    <StyledHeadingBoxSection mb="xs"  heading="The neighborhood" >
                      <Block background="white.base" pb="xxl" dangerouslySetInnerHTML={{ __html: neighborhoodSection.content }} />
                      <LazyListingMapContainer listing={listing} />
                    </StyledHeadingBoxSection>
                  </>
                }

                {/* Community Section */}
                {
                  communitySection && <ListingCommunityContainer communitySection={communitySection} community={community} />
                }


                {/* Reviews */}
                {reviews && reviews.length > 0 &&
                  <ListingReviewsContainer listing={listing} />
                }

                {/* Explore Similar Listing */}
                {!!similarListings?.length && (
                <StyledHeadingBoxSection
                  heading="Explore similar listings"
                  id="sticky-sidebar-boundary"
                  sx$tablet={{ padding: '0 !important' }}
                >
                  <CarouselContainer itemsQty={similarListings.length}>
                    <SimilarListings
                      listings={similarListings}
                      listingStyle={similarListingStyle}
                      canFavourite
                      getEvent={(listing, index) => ({
                          action: 'click',
                          category: 'similarListing',
                          label: index,
                          value: listing.id,
                        })}
                    />
                  </CarouselContainer>
                </StyledHeadingBoxSection>
                )}

              </Body>
              <Column>

                <StickToTop>
                  {/* Agent Question Container */}
                  <ListingAgentQuestionContainer
                    agent={partnerAgent}
                    listing={listing}
                    type="expert"
                    isStatic
                  />
                </StickToTop>
              </Column>
            </TwoColumn>
          </Wrapper>
        </ListingProfilePageTemplate>

        {/* Footer Section */}
        <Block as="footer" background="harvest.lighter-90">
          <Block
            width="100%"
            margin="0 auto"
            padding="l"
            sx$laptop={{
            width: 'col12',
            paddingX: '0',
            paddingBottom: '0',
          }}
          >
            <Block font="title-l" pb="l" textAlign="center" pt="xxxl">
              How can we help?
            </Block>
            <Grid
              gridTemplateRows="repeat(3, 1fr)"
              gridGap="m"
              sx$laptop={{
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
              sx$tablet={{
               gridTemplateColumns: 'repeat(3, 1fr)',
             }}
              pb="xxxl"
            >
              <Button
                width="100%"
                paddingY="s"
                height="s"
                sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}
                onClick={bookTourClickHandler}
              >
                Book a tour
              </Button>
              <Button
                width="100%"
                paddingY="s"
                height="l"
                sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}

              >
                <Link href="tel:3128473794" color="white"> Call (312) 847-3794</Link>

              </Button>
              <Button
                width="100%"
                paddingY="s"
                height="l"
                sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}
                onClick={nearByOptionsClickHandler}
              >
                See nearby options
              </Button>
            </Grid>
          </Block>
        </Block>
        <Footer sx={{ marginBottom: '81px' }} sx$laptop={{ marginBottom: '0px' }} />
      </>
    );
  }
}
