import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';

import ListingActivitiesSection from './containers/ListingActivitiesSection';
import LazyListingMapContainer from './containers/LazyLististingMapContainer';

import { withHydration } from 'sly/web/services/partialHydration';
import { size } from 'sly/common/components/themes';
import Section from 'sly/web/components/molecules/Section';
import { PROFILE_VIEWED } from 'sly/web/services/api/constants';
import { getBreadCrumbsForListing } from 'sly/web/services/helpers/url';
import pad from 'sly/web/components/helpers/pad';
import { color, space, sx$tablet, sx$laptop, Hr, sx, Block, font, Paragraph, layout, Button, Link, Grid } from 'sly/common/system';
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


const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const ListingMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingMediaGallery" */ 'sly/web/listing/ListingMediaGallery/ListingMediaGalleryContainer'));
const ListingSummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingSummary" */ 'sly/web/listing/containers/ListingSummaryContainer'));
const ApartmentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkApartmentSection" */ 'sly/web/listing/components/ApartmentSection'));
const ListingCommunityContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ './containers/ListngCommunityContainer'));
const CommunityAgentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityAgentSection" */ 'sly/web/components/molecules/CommunityAgentSection'));
const ListingReviewsContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ './containers/ListingReviewsContainer'));

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


export default class ListingDetailPage extends PureComponent {
  static propTypes = {
    listing: object.isRequired,
    location: object.isRequired,
  };

  render() {
    const {
      listing,
      location,
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
    };
    const nearByOptionsClickHandler = () => {
      console.log('location');
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
                <Block background="white.base" pb="xxl" px="m" sx$laptop={{ px: '0' }} dangerouslySetInnerHTML={{ __html: description }} />
                )}
              </Body>
            </TwoColumn>
            <PlusBranding />
            <TwoColumn>
              <Body>
                {showMoreImages && (
                <StyledSection
                  title="The apartment"
                  headingFont="title-l"
                  headingMargin="l"
                  paddingTop="xxl"
                  sx$tablet={{ px: 0 }}
                >
                  <ApartmentSection />
                  <Paragraph paddingTop="xl">Please note: The layout, furniture, and decor of your space may vary from what's show here.</Paragraph>
                  <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
                </StyledSection>
            )}
                {/* Partner Agent */}
                {partnerAgent && (
                <>
                  <StyledHeadingBoxSection id="agent-section" heading="Have questions? Our Seniorly Local Advisors are ready to help you." mt="xxl">
                    <CommunityAgentSection agent={partnerAgent} pad="l" />
                    {/* <AskAgentQuestionButtonContainer
                        agent={partnerAgent}
                        width="100%"
                        community={community}
                        type="expert"
                        ctaText={`Talk to ${getAgentFirstName(partnerAgent)} about your options`}
                      /> */}
                  </StyledHeadingBoxSection>
                </>
                )}
                {/* Activities */}
                {
                 activities && <ListingActivitiesSection activities={activities}  activityCalendarURL={activityCalendarURL} />
                }
                {/* Dining */}
                {
                  diningSection &&
                  <>
                    <StyledHeadingBoxSection  heading="Dining" >
                      <Block background="white.base" pb="xxl" px="m" sx$laptop={{ px: '0' }} dangerouslySetInnerHTML={{ __html: diningSection.content }} />
                      {
                        diningSection.url &&
                        <Link href={diningSection.url}>
                          <Button sx$tablet={{ paddingX: 's' }}  variant="neutral" width="100%" mt="m">
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
                    <StyledHeadingBoxSection  heading="The neighborhood" >
                      <Block background="white.base" pb="xxl" px="m" sx$laptop={{ px: '0' }} dangerouslySetInnerHTML={{ __html: neighborhoodSection.content }} />
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
                  <ListingReviewsContainer />
                }
              </Body>
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
              gridTemplateColumns="1fr 1fr"
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
