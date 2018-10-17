import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Hr } from 'sly/components/atoms';

import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';
import Footer from 'sly/components/organisms/Footer';

import PPHTML from './privacypolicytext.js';
import TOSHTML from './tostext.js';


const DescriptionText = styled.div`
  color: ${palette('grayscale', 1)};
  margin-bottom: ${size('spacing.huge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: 1;
    width: ${size('layout.col8')};
    margin-right: ${size('layout.gutter')};
  }
`;



const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.huge')};
`;


const ContentWrapper = styled.div`
  margin-bottom: ${size('spacing.xxxLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-top: -${size('spacing.large')};
  }
`;

/** TODO Check with Fonz/Amal about performance about below */
const legalPageTypes = {
  'privacy':{
    component: <PPHTML/>,
    title : 'Our Privacy Policy',

  },
  'tos':{
    component: <TOSHTML/>,
    title : 'Terms of Use',

  },
};
const LegalPolicyPage = ({ match }) => {
  const { legalPage } = match.params;
  const {component, title} = legalPageTypes[legalPage];

  const description = (
    <Fragment>
      <DescriptionText>
        {component}
      </DescriptionText>
    </Fragment>
  );


  return (
    <Fragment>

      <Helmet>
        <meta name="robots" content="noindex"/>
      </Helmet>

      <OverlappingSectionsTemplate
        imagePath="images/our-history/hero.jpg"
        title={title}
        subtitle="Helping Families and Individuals find the right Senior living options"
        description={description}
        footer={<Footer />}
      >
        <ContentWrapper>
          <StyledHr />

        </ContentWrapper>
      </OverlappingSectionsTemplate>
    </Fragment>
  );
};

export default LegalPolicyPage;
