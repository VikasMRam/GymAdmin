import React from 'react';
import styled from 'styled-components';
import { bool, object } from 'prop-types';

import { size } from 'sly/components/themes';

import Heading from 'sly/components/atoms/Heading';
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
  padding: ${size('spacing.large')};
  padding-top: 0;
`;

const StyledCommunitySearchList = styled(CommunitySearchList)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 75%;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const SideFilterContainer = styled(CommunityFilterList)`
  width: 50%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 25%;
    margin-right: ${size('spacing.xLarge')};
  }
`;
const SearchMapContainer = styled(SearchMap)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 75%;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const ViewMapButton = styled(IconButton)`
  margin-right: ${size('spacing.large')};
`;

const FiltersButton = styled(IconButton)`
  // margin-right: ${size('spacing.large')};
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
      toggleMap,
      isMapView,
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
          <StyledHeading level="subtitle">
            258 communities in San Francisco
          </StyledHeading>
          <ViewMapButton icon="map" ghost transparent>
            View Map
          </ViewMapButton>
          <FiltersButton icon="filter" ghost transparent>
            Filters
          </FiltersButton>
          <div>{requestMeta}</div>
          {/* <SideFilterContainer
          onFieldChange={onParamsChange}
          searchParams={searchParams}
          toggleMap={toggleMap}
          isMapView={isMapView}
        /> */}
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
            />
          )}
        </Wrapper>
      </div>
    );
  }
}

// CommunitySearchPage.propTypes = {
//   communityList: object.isRequired,
// };

export default CommunitySearchPage;
