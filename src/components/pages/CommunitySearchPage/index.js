import React from 'react';
import styled from 'styled-components';
import { bool, object } from 'prop-types';

import { size } from 'sly/components/themes';

import Heading from 'sly/components/atoms/Heading';
import Hr from 'sly/components/atoms/Hr';
import Header from 'sly/components/molecules/Header';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import SearchMap from 'sly/components/organisms/SearchMap';
import IconButton from 'sly/components/molecules/IconButton';

// TODO: remove this
const nextUri = (() => {
  const uris = ['los-angeles', 'san-francisco'];
  return (slug) => {
    const index = uris.indexOf(slug) + 1;
    return uris[index % 2];
  };
})();

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

// TODO : Reuse this FixedColumnWrapper across the App
const FixedColumnWrapper = styled.div`
  display: flex;
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
`;

const StyledCommunitySearchList = styled(CommunitySearchList)`
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
    width: ${size('layout.sideColumn')};
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
  margin-bottom: ${size('spacing.large')};
`;

const ViewMapButton = styled(IconButton)`
  margin-right: ${size('spacing.large')};
`;

const FiltersButton = styled(IconButton)`
`;

class CommunitySearchPage extends React.Component {
  state = {
    menuOpen: false,
  };
  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
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
    // TODO : Header is duplicated. Refactor it so that it can be reused
    const headerItems = [
      { name: 'List on Seniorly', url: '#' },
      { name: 'Help Center', url: '#' },
      { name: 'Saved', url: '#' },
      { name: 'Sign Up', url: '#' },
      { name: 'Login', url: '#' },
    ];
    const menuItems = [
      { name: 'Assisted Living', url: '#' },
      { name: "Alzheimer's Care", url: '#' },
      { name: 'Respite Care', url: '#' },
      { name: 'About Us', url: '#' },
      { name: 'Contact', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'List on Seniorly', url: '#' },
      { name: 'Sign Out', url: '#' },
    ];
    return (
      <div>
        <Header
          menuOpen={this.state.menuOpen}
          onMenuIconClick={this.toggleMenu}
          headerItems={headerItems}
          menuItems={menuItems}
        />
        <Wrapper>
          <SideFilterContainer
            onFieldChange={onParamsChange}
            searchParams={searchParams}
            toggleMap={toggleMap}
            isMapView={isMapView}
          />
          <FixedColumnWrapper>
            <TopWrapper>
              <StyledHeading level="subtitle">
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

            <Hr />

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
      </div>
    );
  }
}

CommunitySearchPage.propTypes = {
   communityList: object.isRequired,
};

export default CommunitySearchPage;
