import React from 'react';
import { any, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import { sx$laptop, sx$tablet } from 'sly/common/system';


const TwoColumnWrapper = styled.div`
  ${sx$laptop({
    display: 'flex',
  })}
`;

// min-width reset is required for changing default flex behaviour which prevents flex-boxes of becoming smaller than it's contents.
// Ref: https://stackoverflow.com/questions/38223879/white-space-nowrap-breaks-flexbox-layout
const MainWrapper = styled.section`
  min-width: 0;
  ${sx$laptop({
    flex: 1,
  })}
`;

const ColumnWrapper = styled.aside`
  visibility: hidden;
  height: 0;
  ${sx$laptop({
    visibility: 'visible',
    height: 'unset',
    position: 'relative',
    display: 'block',
    marginRight: 'l',
    paddingBottom: 'l',
  })}
`;


const CommunitySearchPageTemplate = ({
  children,
  column,
  after,
  searchParams,
}) => (
  <>
    <TemplateHeader>
      <HeaderContainer />
      {/* <BannerNotificationAdContainer type="wizardSearch" {...searchParams} /> */}
    </TemplateHeader>
    <TemplateContent>
      <TwoColumnWrapper>
        <ColumnWrapper>{column}</ColumnWrapper>
        <MainWrapper>{children}</MainWrapper>
      </TwoColumnWrapper>
    </TemplateContent>
    {after}
    <Footer />
  </>
);

CommunitySearchPageTemplate.propTypes = {
  children: any.isRequired,
  column: any.isRequired,
  after: any,
  searchParams: object,
};

export default CommunitySearchPageTemplate;
