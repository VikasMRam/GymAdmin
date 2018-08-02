import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { prop } from 'styled-tools';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Hr, Link, Block, Button, Icon } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
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
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
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
  grayscale: palette('grayscale', 3),
  white: palette('white', 0),
};

const Background = styled.div`
  background: ${p => backgrounds[p.background]};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
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

const OverlappingSectionsTemplate = ({ onLocationSearch, imagePath, intro, description, content, footer }) => {
  const Top = () => {
    return (
      <Fragment>
        <HeaderContainer onLocationSearch={onLocationSearch} />
        <HeroWrapper>
          <StyledImage
            src={imagePath}
            alt="A Home To Love"
          />
        </HeroWrapper>
        <Grid>
          <Background background="grayscale" row="1" />
          <Background background="white" row="2" />
          <Intro>
            {intro}
          </Intro>
          <Description>
            {description}
          </Description>
        </Grid>
      </Fragment>
    );
  };
  return (
    <BasePageTemplate
      header={<Top />}
      footer={footer}
    >
      {content}
    </BasePageTemplate>
  );
};

export default OverlappingSectionsTemplate;
