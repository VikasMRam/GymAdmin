import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import Link from 'sly/components/atoms/Link'

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

const StyledBannerNotification = styled(BannerNotification)`
  margin-bottom: ${size('spacing.large')};
`;


const CommunitySearchPageTemplate = ({
  children,
  column,
}) => (
  <>
    <TemplateHeader>
      <HeaderContainer />
      <StyledBannerNotification palette="warning">
        <Link href="https://www.seniorly.com/resources/articles/coronavirus-and-seniors-a-message-from-our-ceo-co-founder-arthur-bretschneider" _target="blank">
          Coronavirus & Seniors: A Message from Arthur Bretschneider, CEO & Co-founder: Click Here.
        </Link>
      </StyledBannerNotification>
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
