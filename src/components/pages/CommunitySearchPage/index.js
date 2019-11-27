import React from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import loadable from '@loadable/component';

import { size, palette, assetPath } from 'sly/components/themes';
import { titleize } from 'sly/services/helpers/strings';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';
import { getBreadCrumbsForLocation } from 'sly/services/helpers/url';
import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading, Button, Hr, Box, Image } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import IconButton from 'sly/components/molecules/IconButton';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import pad from 'sly/components/helpers/pad';
import { ifProp } from 'styled-tools';

const SearchMap = loadable(() => import(/* webpackChunkName: "chunkSearchMap" */'sly/components/organisms/SearchMap'));

/**
 * Order of appearance as in editor :
 * description, <p>1</p>
 guide, <p>2</p>
 articles, <p>3</p>
 resources, <p>4</p>
 neighborhoods, <p>5</p>
 hospitals, <p>6</p>
 reviews, <p>7</p>
 */
const guideTypes = ['description', 'guide', 'articles', 'resources', 'neighborhoods', 'hospitals', 'reviews'];

const TopWrapper = pad(styled.div`
  display: flex;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }

  > button {
    margin-right: ${size('spacing.large')};
  }
`);

const StyledHeading = pad(Heading, 'large');

const StyledHr = styled(Hr)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    //display: none;
    visibility: hidden;
  }
`;

const FilterColumnWrapper = styled(Box)`
  padding: ${size('spacing.large')};
  width: ${size('layout.col3')};
`;

const ImageButtonWrapper = pad(styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
    max-width: 100%;
  }

  button {
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  }

  ${ifProp('isMapView', '', `
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `)};
`, 'large');

const LegacyContent = pad(styled.div`
  a {
    text-decoration: none;
    color: ${palette('base')};

    &:hover {
      color: ${palette('filler')};
      cursor: pointer;
    }

    &:active {
      color: ${palette('base')};
    }

    &:focus {
      outline: none;
    }
  }
`, 'large');

const ApplyFilterButton = styled(Button)`
  width: 100%;
  display: block;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const ResponsiveFilterWrapper = styled.div`
  @media screen and (max-width: ${size('breakpoint.laptop')}) {
    visibility: ${ifProp('isOpen', 'visible', 'hidden')};
    position: absolute;
    background-color: white;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    padding: ${size('spacing', 'xxLarge')};
`;

LegacyContent.defaultProps = {
  palette: 'primary',
};

const CommunitySearchPage = ({
  isMapView,
  toggleMap,
  onParamsChange,
  onParamsRemove,
  searchParams,
  requestMeta,
  communityList,
  geoGuide,
  location,
  onAdTileClick,
  isFetchingResults,
  areFiltersOpen,
  toggleFiltersOpen,
}) => {
  const listSize = requestMeta['filtered-count'];
  const city = titleize(searchParams.city);
  const tocLabel = getTocSeoLabel(searchParams.toc);
  let latitude = 0;
  let longitude = 0;

  if (communityList.length > 0) {
    ([{ latitude, longitude }] = communityList);
  }

  if (searchParams.latitude && searchParams.longitude) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }

  const guideContent = geoGuide && geoGuide.guideContent;
  const hasGeoGuideContent = guideContent && !(guideContent.ownGuidePage && guideContent.ownGuidePage === 'true');

  return (
    <>
      {getHelmetForSearchPage({
        ...searchParams, url: location, communityList, listSize, geoGuide,
      })}
      <CommunitySearchPageTemplate
        column={(
          <FilterColumnWrapper>
            <>
              <ImageButtonWrapper isMapView={isMapView}>
                {isMapView ? (
                  <IconButton icon="list" onClick={toggleMap} iconPalette="primary" ghost>
                    View List
                  </IconButton>
                  ) : (
                  <>
                    <Image src={assetPath('images/map-placeholder.png')} />
                    <IconButton icon="map" iconSize="regular" onClick={toggleMap} iconPalette="primary" ghost>
                      View Map
                    </IconButton>
                  </>
                )}
              </ImageButtonWrapper>
              <StyledHr />
            </>
            <ResponsiveFilterWrapper isOpen={areFiltersOpen}>
              <CommunityFilterList
                onFieldChange={onParamsChange}
                searchParams={searchParams}
                onParamsRemove={onParamsRemove}
                geoGuideList={geoGuide && geoGuide.cityTOCGuides}
              />
              <ApplyFilterButton kind="jumbo" onClick={toggleFiltersOpen}>Apply Filters</ApplyFilterButton>
            </ResponsiveFilterWrapper>
          </FilterColumnWrapper>
        )}
      >
        <BreadCrumb items={getBreadCrumbsForLocation(searchParams)} />
        {!isMapView && !isFetchingResults && (
          <>
            <StyledHeading level="hero" size="title">{listSize} {tocLabel} near {city}</StyledHeading>
            {(guideContent && (guideContent.autoDescription || guideContent.manualDescription)) && (
              <LegacyContent dangerouslySetInnerHTML={{ __html: guideContent.manualDescription || guideContent.autoDescription }} />
            )}
          </>
        )}
        <TopWrapper>
          {isMapView && (
            <IconButton icon="list" ghost transparent onClick={toggleMap}>
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" iconSize="regular" ghost transparent onClick={toggleMap}>
              View Map
            </IconButton>
          )}
          <IconButton
            icon="tweak"
            ghost
            transparent
            onClick={toggleFiltersOpen}
          >
            Filters
          </IconButton>
        </TopWrapper>
        <StyledHr fullWidth />
        {!isMapView && !isFetchingResults && (
          <>
            <CommunitySearchList
              communityList={communityList}
              onParamsChange={onParamsChange}
              searchParams={searchParams}
              requestMeta={requestMeta}
              onParamsRemove={onParamsRemove}
              onAdTileClick={onAdTileClick}
              isFetchingResults={isFetchingResults}
              location={location}
            />
            {hasGeoGuideContent && (
              guideTypes.map((key) => (
                guideContent[key] ? <LegacyContent dangerouslySetInnerHTML={{ __html: guideContent[key] }} key={key} /> : null
              ))
            )}
            {hasGeoGuideContent && guideContent.seoLinks && (
              <SeoLinks title="Assisted Living in Nearby Cities" links={guideContent.seoLinks} />
            )}
          </>
        )}
        {isMapView && (
          <SearchMap
            latitude={latitude}
            longitude={longitude}
            communityList={communityList}
            searchParams={searchParams}
            onParamsChange={onParamsChange}
          />
        )}
      </CommunitySearchPageTemplate>
    </>
  );
};

CommunitySearchPage.propTypes = {
  communityList: array.isRequired,
  geoGuide: object,
  requestMeta: object.isRequired,
  isMapView: bool,
  toggleMap: func,
  onParamsChange: func,
  onParamsRemove: func,
  location: object,
  searchParams: object,
  onAdTileClick: func,
  isFetchingResults: bool,
  onClientClick: func,
  showModal: func,
  hideModal: func,
  areFiltersOpen: bool,
  toggleFiltersOpen: func,
};

export default CommunitySearchPage;
