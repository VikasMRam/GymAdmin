import React, { Fragment } from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';


import { size, assetPath, palette } from 'sly/components/themes';

import HeaderController from 'sly/controllers/HeaderController';

import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import { Image, Heading, Block } from 'sly/components/atoms';

const FixedWidthContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 0)};
  height: 40vh;
  max-height: ${size('layout.col5')};

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
  opacity: 0.5;
  z-index: 0;
  display: block;
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const Grid = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};

  position: relative;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 100%;
    display: grid;
    margin: unset;
    margin-top: -${size('home.introMargin')};
    grid-template-columns: auto ${size('layout.col12')} auto;
    grid-template-rows: auto auto auto;
  }
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    grid-template-columns: auto ${size('spacing.huge')} ${size('layout.col12')} ${size('spacing.huge')} auto;
    grid-template-rows: auto auto auto;
  }
`;

const backgrounds = {
  slate: palette('slate', 'background'),
  white: palette('white', 0),
};

const Background = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    background: ${p => backgrounds[p.background]};
    grid-column: 1 / span 2;
    grid-row: ${prop('row')} / span 2;
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    grid-column: ${prop('row')} / span 3;
  }
`;

const Intro = styled.div`
  margin: ${size('home.introMargin')} 0;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    grid-column: 3 / span 1;
  }
`;

const Description = styled.div`
  margin-top: ${size('spacing.huge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    grid-column: 2 / span 1;
    grid-row: 2 / span 2;
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    grid-column: 3 / span 1;
  }
`;

const OverlappingSectionsTemplate = ({
  title,
  subtitle,
  imagePath,
  intro,
  description,
  children,
  footer
}) => (
  <Fragment>
    <TemplateHeader>
      <HeaderController />
      <HeroWrapper>
        <HeroBackgroundImage
          src={assetPath(imagePath)}
          alt={`${title} - ${subtitle}`}
        />
        {(title || subtitle) && (
          <HeroTextWrapper>
            <FixedWidthContainer>
              {title && <Heading level="hero" palette="white">{title}</Heading>}
              {subtitle && <Block size="subtitle" palette="white">{subtitle}</Block>}
            </FixedWidthContainer>
          </HeroTextWrapper>
        )}
      </HeroWrapper>
      <Grid>
        <Background background="slate" row="1" />
        <Background background="white" row="2" />
        <Intro>
          {intro}
        </Intro>
        <Description>
          {description}
        </Description>
      </Grid>
    </TemplateHeader>
    <TemplateContent>
      {children}
    </TemplateContent>
    {footer}
  </Fragment>
);

export default OverlappingSectionsTemplate;
