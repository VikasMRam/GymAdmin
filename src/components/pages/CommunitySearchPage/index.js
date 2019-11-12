import React from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import loadable from '@loadable/component';

import { size, palette } from 'sly/components/themes';
import { titleize } from 'sly/services/helpers/strings';
import { getTocSeoLabel } from 'sly/services/helpers/search';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';
import { getBreadCrumbsForLocation } from 'sly/services/helpers/url';
import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading, Button, Hr } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import IconButton from 'sly/components/molecules/IconButton';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import pad from 'sly/components/helpers/pad';
import CommunityFilterListContainer from 'sly/containers/CommunityFilterListContainer';

const SearchMap = loadable(() => import(/* webpackChunkName: "chunkSearchMap" */'sly/components/organisms/SearchMap'));

const TopWrapper = pad(styled.div`
  display: flex;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }

  > button {
    margin-right: ${size('spacing.large')};
  }
`);
const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  height: 100%;
`;
const StyledHeading = pad(Heading, 'large');

const StyledHr = styled(Hr)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
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
  onCommunityClick,
  showModal,
  hideModal,
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

  const handleModalFilterClick = () => {
    const modalContent = (
      <>
        <CommunityFilterListContainer
          onFieldChange={onParamsChange}
          toggleMap={toggleMap}
          isMapView={isMapView}
          isModalView
          toggleFilter={handleModalFilterClick}
          onParamsRemove={onParamsRemove}
        />
        <ApplyFilterButton kind="jumbo" onClick={hideModal}>
          Apply Filters
        </ApplyFilterButton>
      </>
    );

    showModal(modalContent, null, 'sidebar');
  };

  const geoGuideList = (geoGuide && geoGuide.cityTOCGuides);


  const columnContent = (
    <CommunityFilterList
      latitude={latitude}
      longitude={longitude}
      onFieldChange={onParamsChange}
      searchParams={searchParams}
      toggleMap={toggleMap}
      isMapView={isMapView}
      toggleFilter={handleModalFilterClick}
      onParamsRemove={onParamsRemove}
      geoGuideList={geoGuideList}
    />
  );
  const TopContent = () => {
    if (geoGuide && geoGuide.guideContent) {
      const gg = geoGuide.guideContent;
      if (gg.autoDescription || gg.manualDescription) {
        return (
          <>
            <StyledHeading level="hero" size="title">
              {listSize} {tocLabel} near {city}
            </StyledHeading>
            { gg.manualDescription && <LegacyContent dangerouslySetInnerHTML={{ __html: gg.manualDescription }} />}
            {!gg.manualDescription && <LegacyContent dangerouslySetInnerHTML={{ __html: gg.autoDescription }} />}
          </>
        );
      }
    }

    return (
      <>
        <StyledHeading level="hero" size="title">
          {listSize} {tocLabel} near {city}
        </StyledHeading>
      </>
    );
  };

  const ListContent = () => {
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
    if (geoGuide && geoGuide.guideContent && !(geoGuide.guideContent.ownGuidePage && geoGuide.guideContent.ownGuidePage === 'true')) {
      const additionalDivs = [];
      const gg = geoGuide.guideContent;
      ['description', 'guide', 'articles', 'resources',
        'neighborhoods', 'hospitals', 'reviews'].forEach((p) => {
        if (gg[p]) {
          additionalDivs.push(<LegacyContent dangerouslySetInnerHTML={{ __html: gg[p] }} key={p} />);
        }
      });
      if (gg.seoLinks) {
        additionalDivs.push(<SeoLinks key="seoLinks" title="Assisted Living in Nearby Cities" links={gg.seoLinks} />);
      }

      return (
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
            onCommunityClick={onCommunityClick}
          />
          {additionalDivs}
        </>
      );
    }
    // If No Geo Content just return same
    return (
      <CommunitySearchList
        communityList={communityList}
        onParamsChange={onParamsChange}
        searchParams={searchParams}
        requestMeta={requestMeta}
        onParamsRemove={onParamsRemove}
        onAdTileClick={onAdTileClick}
        isFetchingResults={isFetchingResults}
        location={location}
        onCommunityClick={onCommunityClick}
      />
    );
  };

  return (
    <>
      {getHelmetForSearchPage({
        ...searchParams, url: location, communityList, listSize, geoGuide,
      })}
      <CommunitySearchPageTemplate
        column={columnContent}
      >
        <BreadCrumb items={getBreadCrumbsForLocation(searchParams)} />
        {!isMapView && !isFetchingResults && TopContent()}
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
            onClick={handleModalFilterClick}
          >
            Filters
          </IconButton>
        </TopWrapper>
        <StyledHr fullWidth />
        {!isMapView && !isFetchingResults && ListContent()}
        {isMapView && (
          <SearchMapContainer
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
};

export default CommunitySearchPage;
