import React from 'react';
import { any, func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';

const TwoColummnWrapper = styled.div`
  display: flex;
`;
const MainWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;
const ColumnWrapper = styled.aside`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('layout.sideColumn')};
    display: block;
  }
`;

const CommunityDetailPageTemplate = ({
  children,
  column,
  bottom,
  onLocationSearch,
}) => (
  <BasePageTemplate
    header={<HeaderContainer onLocationSearch={onLocationSearch} />}
    footer={<Footer />}
  >
    <TwoColummnWrapper>
      <MainWrapper>{children}</MainWrapper>
      <ColumnWrapper>{column}</ColumnWrapper>
    </TwoColummnWrapper>
    {bottom}
  </BasePageTemplate>
);

CommunityDetailPageTemplate.propTypes = {
  children: any.isRequired,
  column: any.isRequired,
  bottom: any.isRequired,
  onLocationSearch: func,
};

export default CommunityDetailPageTemplate;