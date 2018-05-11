import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';

import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';

import Heading from 'sly/components/atoms/Heading';
import Hr from 'sly/components/atoms/Hr';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';

const TopWrapper = styled.div`
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  height: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
  font-size: ${size('text.subtitle')};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    font-size: ${size('text.title')};
  }
`;

const ViewMapButton = styled(IconButton)`
  margin-right: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;

const FiltersButton = styled(IconButton)`
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;

const StyledHr = styled(Hr)`
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;

const CommunitySearchPage = ({
  isMapView,
  toggleMap,
  onParamsChange,
  onParamsRemove,
  searchParams,
  requestMeta,
  communityList,
}) => {
  let latitude = 0.0;
  let longitude = 0.0;

  if (communityList.length > 0) {
    latitude = communityList[0].latitude;
    longitude = communityList[0].longitude;
  }
  if (searchParams.searchOnMove) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }
  const columnContent = (
    <CommunityFilterList
      onFieldChange={onParamsChange}
      searchParams={searchParams}
      toggleMap={toggleMap}
      isMapView={isMapView}
    />
  );

  return (
    <CommunitySearchPageTemplate
      column={columnContent}
    >
      <TopWrapper>
        <StyledHeading>
          258 communities in San Francisco
        </StyledHeading>
        {isMapView && (
          <ViewMapButton
            icon="list"
            ghost
            transparent
            onClick={toggleMap}
          >
            View List
          </ViewMapButton>
        )}
        {!isMapView && (
          <ViewMapButton icon="map" ghost transparent onClick={toggleMap}>
            View Map
          </ViewMapButton>
        )}
        <FiltersButton icon="filter" ghost transparent>
          Filters
        </FiltersButton>
      </TopWrapper>
      <StyledHr />
      {!isMapView && (
        <CommunitySearchList
          communityList={communityList}
          searchParams={searchParams}
          onParamsRemove={onParamsRemove}
        />
      )}
      {isMapView && (
        <SearchMapContainer
          latitude={latitude}
          longitude={longitude}
          communityList={communityList}
          onParamsChange={onParamsChange}
        />
      )}
    </CommunitySearchPageTemplate>
  );
};

CommunitySearchPage.propTypes = {
  communityList: object.isRequired,
};

export default CommunitySearchPage;
