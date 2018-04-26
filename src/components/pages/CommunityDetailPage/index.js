import React from 'react';
import styled from 'styled-components';
import { string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunityDetail from 'sly/components/organisms/CommunityDetail';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import Header from 'sly/components/atoms/Header';

const PageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }
`;

const Main = styled(CommunityDetail)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const Column = styled(ConciergeContainer)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.sideColumn')};
    display: block;
  }
`;

const CommunityDetailPage = ({ community, userActions }) => {
  return (
    <div>
      <Header />
      <PageWrapper>
        <Main key="main" community={community} />
        <Column key="column" community={community} userActions={userActions} />
      </PageWrapper>
    </div>
  );
};

CommunityDetailPage.propTypes = {
  community: object.isRequired,
  userActions: object.isRequired,
};

export default CommunityDetailPage;
