import React from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import loadable from '@loadable/component';

import { size, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { titleize } from 'sly/web/services/helpers/strings';
import { getTocSeoLabel } from 'sly/web/services/helpers/search';
import { getHelmetForSearchPage } from 'sly/web/services/helpers/html_headers';
import { getBreadCrumbsForLocation, getStateAbbr } from 'sly/web/services/helpers/url';
import PageViewActionContainer from 'sly/web/containers/PageViewActionContainer';
import PageEventsContainer from 'sly/web/containers/PageEventsContainer';
import CommunitySearchPageTemplate from 'sly/web/components/templates/CommunitySearchPageTemplate';
import { Heading, Button, Hr, Box } from 'sly/common/components/atoms';
import { Image } from 'sly/web/components/atoms';
import CommunitySearchList from 'sly/web/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/web/components/organisms/CommunityFilterList';
import IconButton from 'sly/common/components/molecules/IconButton';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import pad from 'sly/web/components/helpers/pad';
import ResponsiveSidebar from 'sly/web/components/molecules/ResponsiveSidebar';
import { PROFILE_VIEWED, SEARCH_PAGE_VIEWED } from 'sly/web/services/api/constants';

const SearchMap = loadable(() => import(/* webpackChunkName: "chunkSearchMap" */'sly/web/components/organisms/SearchMap'));

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

  > a, button {
    margin-right: ${size('spacing.large')};
  }
`);

const StyledHeading = pad(Heading, 'large');

const StyledHr = styled(Hr)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const FilterColumnWrapper = styled(Box)`
  padding: ${size('spacing.large')};
  width: ${size('layout.col3')};
  margin-bottom: ${size('spacing.xLarge')}
`;

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
  margin-top: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none!important;
  }
`;

LegacyContent.defaultProps = {
  palette: 'primary',
};

const CommunitySearchPage = ({
  isMapView,
  mapViewUrl,
  listViewUrl,
  searchParams,
  requestMeta,
  communityList,
  geoGuide,
  location,
  isFetchingResults,
  areFiltersOpen,
  toggleFiltersOpen,
}) => {
  const listSize = requestMeta['filtered-count'];
  const city = titleize(searchParams.city);
  const state = getStateAbbr(searchParams.state);
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
      <PageViewActionContainer actionType={SEARCH_PAGE_VIEWED} actionInfo={{ city: searchParams.city, region: searchParams.state, careType: searchParams.toc }} />
      <CommunitySearchPageTemplate
        column={(
          <>
            <FilterColumnWrapper>
              <>
                {isMapView ? (
                  <IconButton icon="list" to={listViewUrl} iconPalette="primary" ghost>
                    View List
                  </IconButton>
              ) : (
                <Image lazy={false} src={assetPath('images/map-placeholder.png')} aspectRatio="16:9">
                  <IconButton icon="map" to={mapViewUrl} iconPalette="primary" ghost>
                    View Map
                  </IconButton>
                </Image>
              )}
                <StyledHr />
              </>
              <ResponsiveSidebar isOpen={areFiltersOpen} onCloseRequested={toggleFiltersOpen}>
                <CommunityFilterList
                  searchParams={searchParams}
                  geoGuideList={geoGuide && geoGuide.cityTOCGuides}
                />
                <ApplyFilterButton kind="jumbo" onClick={toggleFiltersOpen}>Apply Filters</ApplyFilterButton>
              </ResponsiveSidebar>

            </FilterColumnWrapper>
          </>
        )}
      >
        <BreadCrumb pad="large" items={getBreadCrumbsForLocation(searchParams)} />
        {!isMapView && !isFetchingResults && (
          <>
            <StyledHeading level="hero" size="title">{listSize} {tocLabel} near {city}, {state}</StyledHeading>
            {(guideContent && (guideContent.autoDescription || guideContent.manualDescription)) && (
              <LegacyContent dangerouslySetInnerHTML={{ __html: guideContent.manualDescription || guideContent.autoDescription }} />
            )}
          </>
        )}
        <TopWrapper>
          {isMapView && (
            <IconButton icon="list" ghost transparent to={listViewUrl}>
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" iconSize="body" ghost transparent to={mapViewUrl}>
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
              searchParams={searchParams}
              requestMeta={requestMeta}
              location={location}
            />
            {hasGeoGuideContent && (
              guideTypes.map(key => (
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
            isLoading={isFetchingResults}
            searchParams={searchParams}
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
  location: object,
  searchParams: object,
  isFetchingResults: bool,
  onClientClick: func,
  areFiltersOpen: bool,
  toggleFiltersOpen: func,
};

export default CommunitySearchPage;
