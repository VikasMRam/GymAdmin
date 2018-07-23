import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { prop } from 'styled-tools';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Hr, Link, Block, Button, Icon } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';

const HeroWrapper = styled.div`
  background-color: ${palette('grayscale', 0)};
  height: ${size('header.home.heroImage.height')};
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

const Grid = styled.div`
  margin-top: -${size('home.introMargin')};
  display: grid;
  grid-template-columns: auto ${size('spacing.huge')} ${size('layout.col12')} ${size('spacing.huge')} auto;
  grid-template-rows: auto auto auto;
`;

const backgrounds = {
  grayscale: palette('grayscale', 3),
  white: palette('white', 0),
};

const Background = styled.div`
  grid-column: ${prop('row')} / span 3;
  grid-row: ${prop('row')} / span 2;
  background: ${p => backgrounds[p.background]};
`;

const Intro = styled.div`
  margin: ${size('home.introMargin')} 0;
  width: ${size('layout.col12')};
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
  display: flex;
`;

const IntroText = styled.div`
  width: ${size('layout.col9')};
  font-size: ${size('spacing.xLarge')};
  margin-right: ${size('layout.gutter')};
`;

const IntroLogo = styled.div`
  width: ${size('layout.col3')};
  padding-right: ${size('spacing.xxxLarge')};
  text-align: right;
`;

const Description = styled.div`
  display: flex;
  width: ${size('layout.col12')};
  margin-top: ${size('spacing.huge')};
  grid-column: 3 / span 1;
  grid-row: 2 / span 2;
`;

const DescriptionText = styled.div`
  width: ${size('layout.col8')};
  margin-right: ${size('layout.gutter')};
`;

const DescriptionImage = styled.div`
  width: ${size('layout.col4')};
`;

const BabyArthurImage = styled(Image)`
  width: ${size('layout.col3')};
  height: ${size('layout.col3')};
  object-fit: cover;
  border-radius: calc(${size('layout.col3')} / 2);
`;

const Top = ({ onLocationSearch, hasStickyFooter }) => {
  return (
    <Fragment>
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <StyledImage
          src={assetPath('images/how-it-works/hero.png')}
          alt="A Home To Love"
        />
      </HeroWrapper>
      <Grid>
        <Background background="grayscale" row="1" />
        <Background background="white" row="2" />
        <Intro>
          <IntroText>
            Seniorly is committed to connecting our aging citizens with a home to love.
            We achieve this through a personalized experience built on industry expertise and powerful technology.
          </IntroText>
          <IntroLogo>
            <Icon icon="logo" size="xxLarge" />
          </IntroLogo>
        </Intro>
        <Description>
          <DescriptionText>
            Our CEO, Arthur Bretschneider, is a third-generation senior living operator.  He learned from his father, who learned from his father, how to create a personalized living experience that is respectful of someone’s history, attentive to their care needs, and focused on building community.  A lot has changed for senior housing since his grandfather was a pioneer in 1950s. The senior living industry has grown rapidly giving consumers the ability to move into new homes that match their unique wants and needs to enable them to thrive. Despite this positive new reality, finding the right senior living options is a process that is often difficult, confusing, and frustrating. So, Arthur took on the challenge to solve this problem.
            <br /><br />
            While at Berkeley Haas School of Business, he presented the challenge to his friend Sushanth Ramakrishna. At the time, “Sush” was a software engineer at Salesforce. He was raised to believe community is more important than the individual. His parents and older brother, through their personal examples of serving as doctors and civil servants, instilled in him the joy of pursuing something greater than himself. Throughout his life, Sush saw the vast disparity in access to technology for a large percentage of the population and felt a desire to change that.  He knew that technology was a key part of the solution Arthur was seeking. After discussing this in great detail with Kunal Shah, his undergraduate roommate that he recruited on this journey, Sush joined Arthur officially in 2014 when they became the founders of Seniorly.
            <br /><br />
            Our company is headquartered in San Francisco, a place where technology, innovation, diversity, and passion come together. We also seek knowledge and collaboration from around the world via our offices in Bangalore and London. We pride ourselves on our diversity both in professional expertise and personal culture. We believe that in honoring our aging family members we are building the best way for us all to age. Each member at Seniorly has a personal connection and commitment to our mission. Together, we have created a simple and personalized solution proven to help our parents and loved ones in the next stage of their lives to find a new home to love.
          </DescriptionText>
          <DescriptionImage>
            <BabyArthurImage
              src={assetPath('images/how-it-works/baby-arthur.png')}
              alt="Baby Arthur"
            />
          </DescriptionImage>
        </Description>
      </Grid>
    </Fragment>
  );
};

const HowItWorksPage = () => {
  return (
    <BasePageTemplate
      header={<Top />}
      footer={<Footer />}
    >
        Hello
    </BasePageTemplate>
  );
};

export default HowItWorksPage;
