import React, { Fragment } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { size, assetPath } from 'sly/components/themes';
import { getHelmetForPartnersPage } from 'sly/services/helpers/html_headers';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image, Hr, Paragraph } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import Footer from 'sly/components/organisms/Footer';
import PartnerWithSly from 'sly/components/molecules/PartnerWithSly';
import FactBox from 'sly/components/molecules/FactBox';
import { ColumnWrapper } from 'sly/components/molecules/MostSearchedRegions';

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

const StyledColumnWrapper = styled(ColumnWrapper)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

const PartnersPage = () => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agents-partners-hero.png')} alt="A Home To Love" />
        <HeroTextWrapper><PartnerWithSly /></HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <Fragment>
      {getHelmetForPartnersPage()}
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="Stay with your curreny agency" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business. " />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Work with qualified families" content="We are not one of those “online lead companies”. As a Partner Agent, your profile will be highlighted on Seniorly.com. Families can reach out directly or be matched by Seniorly according to your area of expertise." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Keep over 50% commission" content="You receive over 50% of the referral fee when successfully helping a Seniorly prospect. A referral commission is paid to Seniorly upon a new resident move-in." />
          </ColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection title="Online Discovery Matched With Local Expertise">
          <Paragraph>Seniorly is changing the way families find senior housing and care. Thousands of families visit our site everyday, giving you exposure to new high quality clients.</Paragraph>
          <StyledColumnWrapper>
            <FactBox title="30,000+" description="families found a home with the help of Seniorly Partner Advisors" />
            <FactBox title="98%" description="of families who moved in would recommend their Advisor to a friend" />
            <FactBox title="90%" description="Over 90% of our partners would refer Seniorly to their colleagues" />
          </StyledColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

export default PartnersPage;
