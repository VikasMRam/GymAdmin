import React from 'react';
import styled from 'styled-components';
import { array, bool, func, object, string } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette, assetPath } from 'sly/web/components/themes';
import { titleize } from 'sly/web/services/helpers/strings';
import { getHelmetForSearchPage } from 'sly/web/services/helpers/html_headers';
import { getBreadCrumbsForLocation } from 'sly/web/services/helpers/url';
import CommunitySearchPageTemplate from 'sly/web/components/templates/CommunitySearchPageTemplate';
import { Box, Heading, Image, Link } from 'sly/web/components/atoms';
import CommunitySearchList from 'sly/web/components/organisms/CommunitySearchList';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import { getTocSeoLabel } from 'sly/web/services/helpers/search';
import SearchMap from 'sly/web/components/organisms/SearchMap';
import IconButton from 'sly/web/components/molecules/IconButton';
import CollapsibleSection from 'sly/web/components/molecules/CollapsibleSection';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';


/**
* Order of appearance as in editor :
* description, <p>1</p>
guide, <p>2</p>
hospitals, <p>3</p>
resources, <p>4</p>
neighborhoods, <p>5</p>
hospitals, <p>6</p>
reviews, <p>7</p>
*/
const guideTypes = ['description', 'guide', 'hospitals', 'transportation', 'sports', 'cultural', 'weather', 'reviews'];

const FilterColumnWrapper = styled(Box)`
  padding: ${size('spacing.large')};
  width: ${size('layout.col3')};
`;

const TopWrapper = styled.div`
  display: flex;
  padding-bottom: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }

  > button, a {
    margin-right: ${size('spacing.large')};
  }
`;

const ImageButtonWrapper = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
  }

  a {
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  }

  ${ifProp('isMapView', '', `
    a {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `)};
`;

const StyledImage = styled(ResponsiveImage)`
  max-width: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
  color: ${palette('slate', 'base')};

  span {
    margin-right: ${size('spacing.small')};
  }
`;

const StateSearchPage = ({
  isMapView,
  mapViewUrl,
  listViewUrl,
  searchParams,
  isLoading,
  requestMeta,
  communityList,
  geoGuide,
  location,
  showModal,
  hideModal,
}) => {
  const listSize = requestMeta['filtered-count'];
  const state = titleize(searchParams.state);
  const tocLabel = getTocSeoLabel(searchParams.toc);

  let latitude = 0;
  let longitude = 0;
  if (communityList.length > 0) {
    ([{ latitude, longitude }] = communityList);
  }
  if (searchParams.searchOnMove && searchParams.latitude && searchParams.longitude) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }

  const gg = geoGuide.guideContent ? geoGuide.guideContent : {};
  const seoLinks = gg.seoLinks || [];

  const openCityListModal = () => {
    showModal((
      <CollapsibleSection size="small" title="Cities" borderless>
        {seoLinks.map(seoLink => (
          <StyledLink
            to={seoLink.to}
            id={seoLink.title}
            key={seoLink.title}
            selected={false}
            rel="nofollow"
            onClick={hideModal}
          >
            {seoLink.title}
          </StyledLink>
        ))}
      </CollapsibleSection>
    ), null, 'sidebar');
  };

  return (
    <>
      {getHelmetForSearchPage({
        ...searchParams, url: location, communityList, listSize, geoGuide,
      })}
      <CommunitySearchPageTemplate
        column={(
          <FilterColumnWrapper>
            <ImageButtonWrapper isMapView={isMapView}>
              {isMapView &&
              <IconButton icon="list" to={listViewUrl} iconPalette="primary" ghost>
                View List
              </IconButton>
              }
              {!isMapView &&
              <>
                <StyledImage path="react-assets/map-placeholder.png" aspectRatio="16:9" />
                <IconButton icon="map" iconSize="regular" to={mapViewUrl} iconPalette="primary" ghost>
                  View Map
                </IconButton>
              </>
              }
            </ImageButtonWrapper>
          </FilterColumnWrapper>
        )}
      >
        {!isMapView && (
          <>
            <BreadCrumb items={getBreadCrumbsForLocation(searchParams)} />
            <Heading level="hero" size="title">{listSize} {tocLabel} in {state}</Heading>
            {(gg.autoDescription) && <div dangerouslySetInnerHTML={{ __html: gg.autoDescription }} />}
          </>
        )}
        <TopWrapper>
          {isMapView && (
            <IconButton icon="list" ghost transparent to={listViewUrl}>
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" iconSize="regular" ghost transparent to={mapViewUrl}>
              View Map
            </IconButton>
          )}
          {seoLinks.length > 0 && (
            <IconButton
              icon="tweak"
              ghost
              transparent
              onClick={openCityListModal}
            >
              Cities
            </IconButton>
          )}
        </TopWrapper>

        {!isMapView && (
          <>
            <CommunitySearchList
              communityList={communityList}
              searchParams={searchParams}
              requestMeta={requestMeta}
              location={location}
            />
            {guideTypes.map(key => (gg[key] ? <div dangerouslySetInnerHTML={{ __html: gg[key] }} key={key} /> : null))}
            {gg.seoLinks && <SeoLinks title="Assisted Living in Nearby Cities" links={gg.seoLinks} />}
          </>
        )}
        {isMapView && (
          <SearchMap
            latitude={latitude}
            longitude={longitude}
            communityList={communityList}
            searchParams={searchParams}
            isLoading={isLoading}
          />
        )}
      </CommunitySearchPageTemplate>
    </>
  );
};

StateSearchPage.propTypes = {
  communityList: array.isRequired,
  geoGuide: object,
  requestMeta: object.isRequired,
  isMapView: bool,
  mapViewUrl: string,
  listViewUrl: string,
  isLoading: bool,
  location: object,
  searchParams: object,
  showModal: func,
  hideModal: func,
};

export default StateSearchPage;
