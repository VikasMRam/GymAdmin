import React, { Component } from 'react';

import styled from 'styled-components';

import { array } from 'prop-types';
import { palette } from "styled-theme";

import { size } from 'sly/components/themes';

import {getHelmetForSearchPage} from "sly/services/helpers/html_headers";

import Heading from 'sly/components/atoms/Heading';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import IconButton from 'sly/components/molecules/IconButton';

import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';

import CommunitySearchPageTemplate from 'sly/components/templates/CommunitySearchPageTemplate';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items:flex-start;
  align-content:flex-start;
  margin: 0 auto;
  max-width: ${size('maxWidth')}
`;

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
    width: auto;
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
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
    padding-top: ${size('spacing.large')};
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

// TODO : Reuse this FixedColumnWrapper across the App
const FixedColumnWrapper = styled.div`
  ${p => {
  if (p.isFilterPanelVisible) {
    return `
            display: none;
          `;
        } else {
          return  `
            display: flex;
          `;  
        }
    
    }
  
  }
  
  flex-direction: column;
  margin: 0 auto;

  width: ${size('layout.mobile')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
    display: flex;       
  }
  
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;

const TopWrapper = styled.div`
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display:none;
  }

 
`;


const StyledCommunitySearchList = styled(CommunitySearchList)`
  ${p => {
  if (p.isFilterPanelVisible) {
    return `
            display: none;
          `;
        } else {
          return  `
            display: block;
          `;  
        }
    
    }
  
  }
  
  width: calc(${size('layout.sideColumn')} + ${size('spacing.xLarge')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.laptopLarge')};
    margin-right: ${size('spacing.xLarge')};
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

const StyledHeading = styled(Heading)`
  margin: 0 ${size('spacing.large')};
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

class CommunitySearchPage extends Component{
  static propTypes = {
    communityList: array.isRequired,
  };

  state = {
    isFilterPanelVisible : false,
  };

  showFilters= ()=>{

    this.setState({
      isFilterPanelVisible:true,
    });
  };
  hideFilters= ()=>{

    this.setState({
      isFilterPanelVisible:false,
    });
  };

  render () {
    const {
      isMapView,
      toggleMap,
      onParamsChange,
      onParamsRemove,
      searchParams,
      requestMeta,
      communityList,
      location,
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


    return (

        <CommunitySearchPageTemplate>

          {  getHelmetForSearchPage({...searchParams, url: location.url}) }

          <Wrapper>
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
              <StickyFooter footerInfo={{title:'',name:'',ctaTitle:'Apply'}} onFooterClick={this.hideFilters}/>
              <FilterTranslucentOverlay />
            </FiltersWrapper>
            <FixedColumnWrapper isFilterPanelVisible={this.state.isFilterPanelVisible}>
              <StyledHeading>
                258 communities in San Francisco
              </StyledHeading>
              <TopWrapper>
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
                <FiltersButton icon="filter" ghost transparent onClick={this.showFilters}>
                  Filters
                </FiltersButton>
              </TopWrapper>

              {!isMapView && (
                <StyledCommunitySearchList
                  key="main"
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
            </FixedColumnWrapper>
          </Wrapper>
    </CommunitySearchPageTemplate>
    );
  }
}


CommunitySearchPage.propTypes = {
  communityList: array.isRequired,
};

export default CommunitySearchPage;
