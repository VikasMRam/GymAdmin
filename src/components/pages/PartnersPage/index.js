import React, { Fragment } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { size, assetPath } from 'sly/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';

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

const HeroBackgroundImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: block;
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    max-width: ${size('mobileLayout.col4')};
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

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${size('layout.gutter')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: auto auto auto;
  }
`;

const PartnersPage = () => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agents-partners-hero.png')} alt="A Home To Love" />
        <HeroTextWrapper>

        </HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <Fragment>
      <Helmet>
        <title>Our Senior Living Partner Agents</title>
      </Helmet>
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="Stay with your curreny agency" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business. " />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Get serious referrals" content="We don’t sell leads. Instead, your profile and reviews are displayed on Seniorly.com, so families can choose you as their agent when they are ready to make a move." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Keep 70% commission" content="You recieve 70% of your side of the comission when a referral moves into a home. A referral fee is paid to Seniorly only when you close" />
          </ColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

export default PartnersPage;
