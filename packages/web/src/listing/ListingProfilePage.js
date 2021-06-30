import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';

import { withHydration } from 'sly/web/services/partialHydration';
import { size } from 'sly/common/components/themes';
import Section from 'sly/web/components/molecules/Section';
import { PROFILE_VIEWED } from 'sly/web/services/api/constants';
import { getBreadCrumbsForListing } from 'sly/web/services/helpers/url';
import pad from 'sly/web/components/helpers/pad';
import { color, space, sx$tablet, sx$laptop, Hr, sx, Block, font, Paragraph, layout } from 'sly/common/system';
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


const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const ListingMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingMediaGallery" */ 'sly/web/listing/ListingMediaGallery/ListingMediaGalleryContainer'));
const ListingSummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkListingSummary" */ 'sly/web/listing/containers/ListingSummaryContainer'));
const ApartmentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkApartmentSection" */ 'sly/web/listing/components/ApartmentSection'));


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


export default class CommunityDetailPage extends PureComponent {
  static propTypes = {
    listing: object.isRequired,
    location: object.isRequired,
  };

  render() {
    const {
      listing,
      location,
    } = this.props;

    console.log('gallery', listing);

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
    } = listing;


    const showMoreImages = gallery.images && gallery.images.length > 0;


    const {
      description,
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
                  sx$tablet={{ px: 0 }}
                >

                  <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
                </StyledSection>
            )}
              </Body>
            </TwoColumn>
          </Wrapper>
        </ListingProfilePageTemplate>
      </>
    );
  }
}
