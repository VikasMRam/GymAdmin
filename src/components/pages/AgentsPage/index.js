import React, { Fragment } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';
import Helmet from 'react-helmet';

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

const AgentsPage = ({ onSubmitForm, onLocationSearch }) => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agent-hero.png')} alt="A Home To Love" />
        <HeroTextWrapper>
          <FindLocalAgent onLocationSearch={onLocationSearch} />
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
      <Helmet>
        <title>Our Senior Living Partner Agents</title>
      </Helmet>
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection>
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="100% free" content="Seniorly Partner Agents are commissioned by the community you choose only when you move-in. They are on your side to find and choose the right option." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Personalized Service" content="Navigating this process can be a challenge. Your agent will help you throughout to answer questions, weigh your options, accompany you on tours and help you get the best deal for your budget." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Local Insider Expertise" content="Your agent will know and share the unique details of communities and care options in your area." />
          </ColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection centerTitle title="Search senior living agents by region">
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
  onLocationSearch: func,
};

export default AgentsPage;
