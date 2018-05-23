import React from 'react';
import { any, func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import DefaultHeaderTemplate from 'sly/components/templates/DefaultHeaderTemplate';
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
    header={<DefaultHeaderTemplate onLocationSearch={onLocationSearch} />}
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
  onLocationSearch: func,
};

export default CommunitySearchPageTemplate;
