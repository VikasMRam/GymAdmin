import React, { Component } from 'react';
import styled from 'styled-components';

import { array } from 'prop-types';
import { palette } from "styled-theme";

import { size } from 'sly/components/themes';


import Heading from 'sly/components/atoms/Heading';
import Hr from 'sly/components/atoms/Hr';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';

import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items:flex-start;
  align-content:flex-start;
  margin: 0 auto;
  max-width: ${size('maxWidth')}
`;

// TODO : Reuse this FixedColumnWrapper across the App
const FixedColumnWrapper = styled.div`
  ${p => {
  if (p.filtersShown) {
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
  if (p.filtersShown) {
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

const SideFilterContainer = styled.div`
  ${p => {
        if (p.filtersShown) {
          return ` 
            display: block;
            position: absolute;
            width: 100%;
            background-color: #ggg;
          `
        } else {
          return  `
            display: none;
          `;  
        }
    
    }
  
  }
  margin-bottom: ${size('spacing.xxLarge')};
  
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    z-index: 1;
    margin-bottom: 0;
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

const StyledHr = styled(Hr)`
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;



class CommunitySearchPage extends Component{
  static propTypes = {
    communityList: array.isRequired,
  };

  state = {
    filtersShown : false,
  };

  showFilters= ()=>{

    this.setState({
      filtersShown:true,
    });
  };
  hideFilters= ()=>{

    this.setState({
      filtersShown:false,
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
      <main>
        <Wrapper>
          <SideFilterContainer filtersShown={this.state.filtersShown}>
            <CommunityFilterList
            onFieldChange={onParamsChange}
            searchParams={searchParams}
            toggleMap={toggleMap}
            isMapView={isMapView}
            />
            <StickyFooter footerInfo={{title:'Call',name:'some',ctaTitle:'Apply'}} onFooterClick={this.hideFilters}/>
          </SideFilterContainer>
          <FixedColumnWrapper filtersShown={this.state.filtersShown}>
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
      </main>
    );
  }
}

CommunitySearchPage.propTypes = {
  communityList: array.isRequired,
};

export default CommunitySearchPage;
