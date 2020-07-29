import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { getHelmetForPartnersPage } from 'sly/web/services/helpers/html_headers';
import { partnerFAQs } from 'sly/web/constants/agents';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import { Hr, ResponsiveImage } from 'sly/web/components/atoms';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Section from 'sly/web/components/molecules/Section';
import Footer from 'sly/web/components/organisms/Footer';
import PartnerWithSly from 'sly/web/components/molecules/PartnerWithSly';
import BecomeSlyPartnerBanner from 'sly/web/components/molecules/BecomeSlyPartnerBanner';
import FAQSection from 'sly/web/components/organisms/FAQSection';

const HeroWrapper = styled.div`
  position: relative;
  height: ${size('header.agents.heroImage.height')};

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const StyledImage = styled(ResponsiveImage)`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
  img {
    object-position: right;
  }
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    max-width: calc(100% - ${size('spacing.large')});
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      max-width: ${size('tabletLayout.col6')};
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      max-width: ${size('layout.col8')};
    }
  }
`;

const StyledSection = styled(Section)`
  text-align: left;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const PartnersPage = () => {
  const headerContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage path="react-assets/agents-partners-hero.png" alt="A Home To Love" height={480} />
        <HeroTextWrapper><PartnerWithSly /></HeroTextWrapper>
      </HeroWrapper>
    </>
  );

  return (
    <>
      {getHelmetForPartnersPage()}
      <TemplateHeader>
        {headerContent}
      </TemplateHeader>
      <Hr />
      <TemplateContent>
        <StyledSection title="Meet Seniorly Partner Agents">
          Section
        </StyledSection>
      </TemplateContent>
      <BecomeSlyPartnerBanner />
      <StyledSection>
        <TemplateContent>
          <FAQSection faqs={partnerFAQs} />
        </TemplateContent>
      </StyledSection>
      <Footer />
    </>
  );
};

export default PartnersPage;
