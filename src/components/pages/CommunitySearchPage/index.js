import React from 'react';
import styled from 'styled-components';
import { bool, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';
import CommunityMap from "sly/components/organisms/CommunityMap";
import SearchMap from "sly/components/organisms/SearchMap";

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
  display:flex;
  flex-direction:row;
`

const Main = styled(CommunitySearchList)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
    
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 75%;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const SideFilter = styled(CommunityFilterList)`
  width: 50%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 25%;
    margin-right: ${size('spacing.xLarge')};
  } 
`;

const CommunitySearchPage = ({ toggleMap, isMapView, searchParams , requestMeta, communityList }) => {
  let latitude = 0.00;
  let longitude = 0.00;
  if (communityList.length > 0){
    latitude = communityList[0].latitude;
    longitude = communityList[0].longitude;
  }

  return (


    <Wrapper>
      <div>{requestMeta}</div>
      <SideFilter toggleMap={toggleMap} isMapView={isMapView} />
      {!isMapView && <Main key="main" communityList={communityList} />}
      {isMapView && <SearchMap latitude={latitude} longitude={longitude} propertiesList={communityList}/>}
      {/*{!isMapView && <SideFilter/>}*/}
    </Wrapper>
  );
};

CommunitySearchPage.propTypes = {
  communityList: object.isRequired,
};

export default CommunitySearchPage;
