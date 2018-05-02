import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunitySearchList from 'sly/components/organisms/CommunitySearchList';



const Main = styled(CommunitySearchList)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;


const CommunitySearchPage = ({ communityList }) => {
  return (
    //Add Filter Elements
    //Add
    <Main key="main" communityList={communityList} />
  );
};

CommunitySearchPage.propTypes = {
  communityList: object.isRequired,
};

export default CommunitySearchPage;
