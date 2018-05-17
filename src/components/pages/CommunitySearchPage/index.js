import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { array, bool, func, object } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import { titleize } from 'sly/services/helpers/strings';
import { getHelmetForSearchPage } from 'sly/services/helpers/html_headers';
import SlyEvent from "sly/services/helpers/events";

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

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
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

export default class CommunitySearchPage extends Component {
  static propTypes = {
    communityList: array.isRequired,
    requestMeta: object.isRequired,
    isMapView: bool,
    toggleMap: func,
    onParamsChange: func,
    onParamsRemove: func,
    onLocationSearch: func,
  };

  state = {
    isModalFilterPanelVisible: false,
  };

  showFilters = () => {
    this.setState({
      isModalFilterPanelVisible: true,
    });

    SlyEvent.getInstance().sendEvent({action:'show',category:'filters'});
  };
  hideFilters = () => {
    this.setState({
      isModalFilterPanelVisible: false,
    });

    SlyEvent.getInstance().sendEvent({action:'hide',category:'filters'});
  };

  componentDidMount() {
    // sendPageView(this.props.location.pathname);
    SlyEvent.getInstance().sendPageView(this.props.location.pathname);
  }

  render() {
    const {
      isMapView,
      toggleMap,
      onParamsChange,
      onParamsRemove,
      onLocationSearch,
      searchParams,
      requestMeta,
      communityList,
      location,
    } = this.props;
    const listSize = requestMeta['filtered-count'];
    const city = titleize(searchParams.city);

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
        toggleFilter={this.hideFilters}
      />
    );

    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        {getHelmetForSearchPage({ ...searchParams, url: location })}
        <Modal
          closeable
          onClose={this.hideFilters}
          layout="sidebar"
          isOpen={this.state.isModalFilterPanelVisible}
        >
          <CommunityFilterList
            onFieldChange={onParamsChange}
            searchParams={searchParams}
            toggleMap={toggleMap}
            isMapView={isMapView}
            isModalView
            toggleFilter={this.hideFilters}
          />
          <Button kind="jumbo" onClick={this.hideFilters}>
            Apply Filters
          </Button>
        </Modal>
        <CommunitySearchPageTemplate
          column={columnContent}
          onLocationSearch={onLocationSearch}
        >
          <Heading>
            {listSize} communities near {city}
          </Heading>
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
              onClick={this.showFilters}
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
              onParamsChange={onParamsChange}
            />
          )}
        </CommunitySearchPageTemplate>
      </Fragment>
    );
  }
}
