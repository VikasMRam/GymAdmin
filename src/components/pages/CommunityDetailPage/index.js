import React from 'react';
import styled from 'styled-components';
import { string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunityDetail from 'sly/components/organisms/CommunityDetail';
import ConciergeContainer from 'sly/containers/ConciergeContainer';

const PageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(${size('layout.mainColumn')} + ${size('layout.sideColumn')} + ${size('spacing.xLarge')});
  }
`;

const Main = styled(CommunityDetail)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const Column = styled(ConciergeContainer)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('layout.sideColumn')};
    display: block;
  }
`;

const CommunityDetailPage = ({ community, userActions }) => {
  return (
    <PageWrapper>
      <Main key="main" community={community} />
      <Column key="column" community={community} userActions={userActions} />
    </PageWrapper>
  );
};

CommunityDetailPage.propTypes = {
  community: object.isRequired,
  userActions: object.isRequired,
};

export default CommunityDetailPage;
