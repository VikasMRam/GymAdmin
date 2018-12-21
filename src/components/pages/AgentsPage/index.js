import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';

import { size, assetPath } from 'sly/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Link, Image, Heading, Hr } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import FindLocalAgent from 'sly/components/organisms/FindLocalAgent';
import TalkToAgentFormContainer from 'sly/containers/TalkToAgentFormContainer';

const mostSearchedRegions = [
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'West Coast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'East Coast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'Southeast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'Midwest',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'South',
  },
];

const StyledLink = styled(Link)`
  display: block;
`;

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

const FormSection = StyledSection.extend`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${size('mobileLayout.gutter')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-gap: ${size('tabletLayout.gutter')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: auto auto auto;
  }
`;

const MSColumnWrapper = ColumnWrapper.extend`
  grid-template-columns: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: auto auto;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: auto auto auto;
  }
`;

const StyledImageOverlayContentTile = styled(ImageOverlayContentTile)`
  height: ${size('element.huge')};
`;

const AgentsPage = ({ onSubmitForm }) => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agent-hero.png')} alt="A Home To Love" />
        <HeroTextWrapper>
          <FindLocalAgent />
        </HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );
  const mostSearchedRegionsComponents = mostSearchedRegions.map(mostSearchedRegion => (
    <StyledLink key={mostSearchedRegion.title} to={mostSearchedRegion.to}>
      <StyledImageOverlayContentTile size="small" image={mostSearchedRegion.image}>
        <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedRegion.title}</Heading>
      </StyledImageOverlayContentTile>
    </StyledLink>
  ));

  return (
    <Fragment>
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection title="Why should I work with an agent?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="Service from start to finish" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Expert negotiators" content="We don't sell leads. Instead, your profile and reviews are displayed on Seniorly.com, so families can choose you as their agent when they are ready to make a move." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Choose the right agent for you" content="You receive 70% of your side of the comission when a referral moves into a home. A referral fee is paid to Seniorly only when you close" />
          </ColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection title="Search senior living agents by region">
          <MSColumnWrapper>
            {mostSearchedRegionsComponents}
          </MSColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <FormSection>
          <TalkToAgentFormContainer onSubmit={onSubmitForm} />
        </FormSection>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

AgentsPage.propTypes = {
  onSubmitForm: func,
};

export default AgentsPage;
