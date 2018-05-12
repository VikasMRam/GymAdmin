import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { array, bool, func } from 'prop-types';
import { palette } from "styled-theme";

import { size } from 'sly/components/themes';

import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';
import { Heading } from 'sly/components/atoms';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';

const filtersWrapperDisplay = p => (p.isFilterPanelVisible ? 'flex' : 'none');
const FiltersWrapper = styled.div`
  display: ${filtersWrapperDisplay};
  margin-bottom: ${size('spacing.large')};
  // Overlay Settings
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 102; // Above Header Menu

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    position: relative;
  }
`;

const FilterMenuWrapper = styled.div`
  background: white;
  margin-bottom: ${size('spacing.large')};


  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xxLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: 0;
  }
`;

const FilterTranslucentOverlay = styled.div`
  width: 100%;
  background: ${palette('slate', 0)}e5;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const FiltersMenuCloseButton = styled(IconButton)`
  margin: ${size('spacing.large')};
  margin-bottom: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

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

const SideFilterContainer = styled(CommunityFilterList)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  height: 100%;
`;

export default class CommunitySearchPage extends Component {
  static propTypes = {
    communityList: array.isRequired,
    isMapView: bool,
    toggleMap: func,
    onParamsChange: func,
    onParamsRemove: func,
  };

  state = {
    isFilterPanelVisible: false,
  };

  showFilters= () => {
    this.setState({
      isFilterPanelVisible: true,
    });
  };
  hideFilters= () => {
    this.setState({
      isFilterPanelVisible: false,
    });
  };

  render() {
    const {
      isMapView,
      toggleMap,
      onParamsChange,
      onParamsRemove,
      searchParams,
      requestMeta,
      communityList,
    } = this.props;

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
      <FiltersWrapper isFilterPanelVisible={this.state.isFilterPanelVisible}>
        <FilterMenuWrapper>
          <FiltersMenuCloseButton
            icon="close"
            iconSize="regular"
            palette="black"
            transparent
            onClick={this.hideFilters}
          />
          <SideFilterContainer
            onFieldChange={onParamsChange}
            searchParams={searchParams}
            toggleMap={toggleMap}
            isMapView={isMapView}
            isFilterPanelVisible={this.state.isFilterPanelVisible}
            toggleFilter={this.hideFilters}
          />
        </FilterMenuWrapper>
        <StickyFooter footerInfo={{ title: '', name: '', ctaTitle: 'Apply' }} onFooterClick={this.hideFilters} />
        <FilterTranslucentOverlay />
      </FiltersWrapper>
    );

    return (
      <CommunitySearchPageTemplate
        column={columnContent}
      >
        <Heading>
          258 communities in San Francisco
        </Heading>
        <TopWrapper>
          {isMapView && (
            <IconButton
              icon="list"
              ghost
              transparent
              onClick={toggleMap}
            >
              View List
            </IconButton>
          )}
          {!isMapView && (
            <IconButton icon="map" ghost transparent onClick={toggleMap}>
              View Map
            </IconButton>
          )}
          <IconButton icon="filter" ghost transparent onClick={this.showFilters}>
            Filters
          </IconButton>
        </TopWrapper>

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
  }
}
