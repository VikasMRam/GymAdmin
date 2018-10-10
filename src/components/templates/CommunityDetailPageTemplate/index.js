import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import HeaderController from 'sly/controllers/HeaderController';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';

const TwoColummnWrapper = styled.div`
  display: flex;
`;
const MainWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;
const ColumnWrapper = styled.aside`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col4')};
    display: block;
  }
`;

const CommunityDetailPageTemplate = ({
  children,
  column,
  bottom,
}) => (
  <BasePageTemplate
    header={<HeaderController />}
    footer={<Footer />}
    hasStickyFooter
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
};

export default CommunityDetailPageTemplate;
