import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';

const TwoColumnWrapper = styled.div`
  display: flex;
`;
const MainWrapper = styled.section`
  flex: 1;
`;
const ColumnWrapper = styled.aside`
  width: ${size('layout.sideColumnSmall')};
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const CommunitySearchPageTemplate = ({
  children,
  column,
  onLocationSearch,
}) => (
  <BasePageTemplate
    header={<HeaderContainer onLocationSearch={onLocationSearch} />}
    footer={<Footer />}
  >
    <TwoColumnWrapper>
      <ColumnWrapper>{column}</ColumnWrapper>
      <MainWrapper>{children}</MainWrapper>
    </TwoColumnWrapper>
  </BasePageTemplate>
);

CommunitySearchPageTemplate.propTypes = {
  children: any.isRequired,
  column: any.isRequired,
};

export default CommunitySearchPageTemplate;
