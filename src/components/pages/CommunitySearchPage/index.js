import React, { Fragment } from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';

import { size } from 'sly/components/themes';

import { titleize } from 'sly/services/helpers/strings';
import { getTocSearchLabel } from 'sly/services/helpers/search';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';

import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading, Button, Hr } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';
import Modal from 'sly/components/molecules/Modal';
import Thankyou from 'sly/components/molecules/Thankyou';

import CAWController from 'sly/external/wizards/caw/Controller';

import { THANK_YOU, CAW_WIZARD } from 'sly/constants/modalType';

const TopWrapper = styled.div`
  padding-bottom: ${size('spacing.xLarge')};

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

const StyledHr = styled(Hr)`
  // Hacky way to implement a Hr beyond the fixed width container
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const StyledButton= styled(Button)`
  margin-bottom: ${size('spacing.large')};
`;

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
  isModalFilterPanelVisible,
  onToggleModalFilterPanel,
  onAdTileClick,
  isFetchingResults,
}) => {
  const listSize = requestMeta['filtered-count'];
  const city = titleize(searchParams.city);
  const tocLabel = getTocSearchLabel(searchParams.toc);
  let latitude = 0;
  let longitude = 0;
  if (communityList.length > 0) {
    ([{ latitude, longitude }] = communityList);
  }
  if (searchParams.latitude && searchParams.longitude) {
    latitude = parseFloat(searchParams.latitude);
    longitude = parseFloat(searchParams.longitude);
  }

  const columnContent = (
    <CommunityFilterList
      latitude={latitude}
      longitude={longitude}
      onFieldChange={onParamsChange}
      searchParams={searchParams}
      toggleMap={toggleMap}
      isMapView={isMapView}
      toggleFilter={onToggleModalFilterPanel}
      onParamsRemove={onParamsRemove}
    />
  );
  const TopContent = () => {
    if (geoGuide && geoGuide.guideContent) {
      let gg = geoGuide.guideContent;
      if (gg.autoDescription) {
        return (<Fragment>
          <StyledHeading level={'hero'} size={'title'}>
            {listSize} {tocLabel} near {city}
          </StyledHeading>
          <div dangerouslySetInnerHTML={{__html: gg.autoDescription}}/>
        </Fragment>);
      }

    }

    return (
      <Fragment>
        <StyledHeading level={'hero'} size={'title'}>
          {listSize} {tocLabel} near {city}
        </StyledHeading>
      </Fragment>);
  };

  const ListContent = ()=> {
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
    if (geoGuide && geoGuide.guideContent) {
      let additionalDivs = [];
      let gg = geoGuide.guideContent;
      ['description','guide','articles','resources',
      'neighborhoods','hospitals','reviews'].forEach((p)=>{
        if (gg.hasOwnProperty(p)){
          additionalDivs.push(<div dangerouslySetInnerHTML={{__html: gg[p]}} key={p}/>)
        }
      });

      return (
        <Fragment>
          <CommunitySearchList
            communityList={communityList}
            onParamsChange={onParamsChange}
            searchParams={searchParams}
            requestMeta={requestMeta}
            onParamsRemove={onParamsRemove}
            onAdTileClick={onAdTileClick}
            isFetchingResults={isFetchingResults}
          />
          {additionalDivs}
        </Fragment>
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
      />
    );
  };

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      {getHelmetForSearchPage({ ...searchParams, url: location, communityList, listSize })}
      <Modal
        closeable
        onClose={onToggleModalFilterPanel}
        layout="sidebar"
        isOpen={isModalFilterPanelVisible}
        closeButtonPalette="slate"
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
      >
        {isFetchingResults && <StyledHeading level="hero" size="title">loading...</StyledHeading>}
        {!isMapView && !isFetchingResults && TopContent()}
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
        <StyledHr />
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
        { searchParams.modal === THANK_YOU &&
        <Modal closeable isOpen onClose={() => onParamsRemove({ paramsToRemove: ['modal'] })}>
          <Thankyou />
          <StyledButton
            kind="jumbo"
            onClick={() => onParamsRemove({ paramsToRemove: ['modal'] })}
          >
              Click to Continue
          </StyledButton>
        </Modal>}
        { searchParams.modal === CAW_WIZARD && <Modal closeable isOpen layout="wizard" onClose={() => onParamsRemove({ paramsToRemove: ['modal'] })}><CAWController /></Modal>}
      </CommunitySearchPageTemplate>
    </Fragment>
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
  isModalFilterPanelVisible: bool,
  onToggleModalFilterPanel: func,
  onAdTileClick: func,
  isFetchingResults: bool,
};

export default CommunitySearchPage;
