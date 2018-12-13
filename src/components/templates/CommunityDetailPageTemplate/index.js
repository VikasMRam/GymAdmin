import React, { Fragment } from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import BannerNotification from 'sly/components/molecules/BannerNotification';

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
  bannerNotification,
}) => (
  <Fragment>
    <TemplateHeader>
      <HeaderContainer />
      {bannerNotification && <BannerNotification>{bannerNotification}</BannerNotification>}
    </TemplateHeader>
    <TemplateContent hasStickyFooter>
      <TwoColummnWrapper>
        <MainWrapper>{children}</MainWrapper>
        <ColumnWrapper>{column}</ColumnWrapper>
      </TwoColummnWrapper>
      {bottom}
    </TemplateContent>
    <Footer />
  </Fragment>
);

CommunityDetailPageTemplate.propTypes = {
  children: any.isRequired,
  column: any.isRequired,
  bottom: any.isRequired,
  bannerNotification: any,
};

export default CommunityDetailPageTemplate;
