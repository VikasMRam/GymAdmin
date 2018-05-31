import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import { titleize } from 'sly/services/helpers/strings';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';

import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading, Button } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';
import Modal from 'sly/components/molecules/Modal';

const TopWrapper = styled.div`
  padding-bottom: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }

  > button {
    margin-right: ${size('spacing.large')};
  }
`;
const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  height: 100%;
`;
const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const CommunitySearchPage = ({
  isMapView,
  toggleMap,
  onParamsChange,
  onParamsRemove,
  onLocationSearch,
  searchParams,
  requestMeta,
  communityList,
  location,
  isModalFilterPanelVisible,
  onToggleModalFilterPanel,
}) => {
  const listSize = requestMeta['filtered-count'];
  const city = titleize(searchParams.city);
  const toc = titleize(searchParams.toc).toLowerCase();

  let latitude = 0;
  let longitude = 0;
  if (communityList.length > 0) {
    ([{ latitude, longitude }] = communityList);
  }
  if (searchParams.searchOnMove && searchParams.latitude && searchParams.longitude) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }
  const columnContent = (
    <CommunityFilterList
      onFieldChange={onParamsChange}
      searchParams={searchParams}
      toggleMap={toggleMap}
      isMapView={isMapView}
      toggleFilter={onToggleModalFilterPanel}
      onParamsRemove={onParamsRemove}
    />
  );

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      {getHelmetForSearchPage({ ...searchParams, url: location, communityList })}
      <Modal
        closeable
        onClose={onToggleModalFilterPanel}
        layout="sidebar"
        isOpen={isModalFilterPanelVisible}
      >
        <CommunityFilterList
          onFieldChange={onParamsChange}
          searchParams={searchParams}
          toggleMap={toggleMap}
          isMapView={isMapView}
          isModalView
          toggleFilter={onToggleModalFilterPanel}
          onParamsRemove={onParamsRemove}
        />
        <Button kind="jumbo" onClick={onToggleModalFilterPanel}>
          Apply Filters
        </Button>
      </Modal>
      <CommunitySearchPageTemplate
        column={columnContent}
        onLocationSearch={onLocationSearch}
      >
        {!isMapView && (
          <StyledHeading level={'hero'} size={'title'}>
            {listSize} {toc} communities near {city}
          </StyledHeading>
        )}
        <TopWrapper>
          {isMapView && (
            <IconButton icon="list" ghost transparent onClick={toggleMap}>
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" ghost transparent onClick={toggleMap}>
              View Map
            </IconButton>
          )}
          <IconButton
            icon="filter"
            ghost
            transparent
            onClick={onToggleModalFilterPanel}
          >
            Filters
          </IconButton>
        </TopWrapper>

        {!isMapView && (
          <CommunitySearchList
            communityList={communityList}
            onParamsChange={onParamsChange}
            searchParams={searchParams}
            requestMeta={requestMeta}
            onParamsRemove={onParamsRemove}
          />
        )}
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
    </Fragment>
  );
};

CommunitySearchPage.propTypes = {
  communityList: array.isRequired,
  requestMeta: object.isRequired,
  isMapView: bool,
  toggleMap: func,
  onParamsChange: func,
  onParamsRemove: func,
  onLocationSearch: func,
  location: object,
  searchParams: object,
  isModalFilterPanelVisible: bool,
  onToggleModalFilterPanel: func,
};

export default CommunitySearchPage;
