import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { Hr } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import OverlappingSectionsTemplate from 'sly/web/components/templates/OverlappingSectionsTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import PPHTML from 'sly/web/components/pages/LegalPolicyPage/privacypolicytext';
import TOSHTML from 'sly/web/components/pages/LegalPolicyPage/tostext';

const DescriptionText = pad(styled.div`
  color: ${palette('slate', 'filler')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: 1;
    width: ${size('layout.col8')};
    margin-right: ${size('layout.gutter')};
  }
`, 'huge');

const PaddedHr = pad(Hr, 'huge');

const ContentWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-top: -${size('spacing.large')};
  }
`, 'xxxLarge');

/** TODO Check with Fonz/Amal about performance about below */
const legalPageTypes = {
  privacy: {
    component: <PPHTML />,
    title: 'Our Privacy Policy',
  },
  tos: {
    component: <TOSHTML />,
    title: 'Terms of Use',
  },
};
const LegalPolicyPage = ({ match }) => {
  const { legalPage } = match.params;
  const { component, title } = legalPageTypes[legalPage];

  const description = (
    <DescriptionText>
      {component}
    </DescriptionText>
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <OverlappingSectionsTemplate
        imagePath="react-assets/our-history/hero.jpg"
        title={title}
        subtitle="Helping Families and Individuals find the right Senior living options"
        description={description}
        footer={<Footer />}
      >
        <ContentWrapper>
          <PaddedHr />
        </ContentWrapper>
      </OverlappingSectionsTemplate>
    </>
  );
};

LegalPolicyPage.propTypes = {
  match: object,
};

export default LegalPolicyPage;
