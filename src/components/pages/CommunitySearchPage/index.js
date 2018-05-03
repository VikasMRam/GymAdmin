import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';
import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';

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
const BarFilter = styled(CommunityFilterList)`
  width: 50%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 25%;
    margin-right: ${size('spacing.xLarge')};
  } 
`;


const CommunitySearchPage = ({ toggleMap, isMapView, searchParams , communityList }) => {
  return (
    //Add Filter Elements
    //Add
    <Wrapper>
      <SideFilter/>
      <BarFilter/>
      <Main key="main" communityList={communityList} />
    </Wrapper>
  );
};

CommunitySearchPage.propTypes = {
  communityList: object.isRequired,
};

export default CommunitySearchPage;
