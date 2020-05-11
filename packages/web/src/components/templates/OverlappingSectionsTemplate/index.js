import React from 'react';
import styled from 'styled-components';

import { size, assetPath, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import { Image, Heading, Block } from 'sly/components/atoms';
import ResponsiveImage from 'sly/components/atoms/ResponsiveImage';

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
  background-color: ${palette('slate', 'base')};
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

const HeroBackgroundImage = styled(ResponsiveImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
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
    width: ${size('layout.col12')};
  }
`;

const Intro = styled.div`
  margin: ${size('home.introMargin')} 0;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
  }
`;

const Description = styled.div`
  margin-top: ${size('spacing.huge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
  }
`;

const OverlappingSectionsTemplate = ({
  title,
  subtitle,
  imagePath,
  intro,
  description,
  children,
  footer,
}) => (
  <>
    <TemplateHeader>
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage
          path={imagePath}
          alt={`${title} - ${subtitle}`}
          height={416}
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
  </>
);

export default OverlappingSectionsTemplate;
