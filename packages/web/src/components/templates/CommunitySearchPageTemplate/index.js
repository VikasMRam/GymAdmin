import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import BannerNotificationAdContainer from 'sly/web/containers/BannerNotificationAdContainer';

const TwoColumnWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
  }
`;

// min-width reset is required for changing default flex behaviour which prevents flex-boxes of becoming smaller than it's contents.
// Ref: https://stackoverflow.com/questions/38223879/white-space-nowrap-breaks-flexbox-layout
const MainWrapper = styled.section`
  min-width: 0;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex: 1;
  }
`;

const ColumnWrapper = styled.aside`
  visibility: hidden;
  height: 0;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    visibility: visible;
    height: unset;

    position: relative;
    display: block;
    margin-right: ${size('spacing.xLarge')};
    padding-bottom: ${size('spacing.xLarge')};
  }
`;


const CommunitySearchPageTemplate = ({
  children,
  column,
}) => (
  <>
    <TemplateHeader>
      <HeaderContainer />
      <BannerNotificationAdContainer type="covid-19" />
    </TemplateHeader>
    <TemplateContent>
      <TwoColumnWrapper>
        <ColumnWrapper>{column}</ColumnWrapper>
        <MainWrapper>{children}</MainWrapper>
      </TwoColumnWrapper>
    </TemplateContent>
    <Footer />
  </>
);

CommunitySearchPageTemplate.propTypes = {
  children: any.isRequired,
  column: any.isRequired,
};

export default CommunitySearchPageTemplate;
