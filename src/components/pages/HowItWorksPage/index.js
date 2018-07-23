import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Image, Label, Heading, Hr, Link, Block, Button } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';

const Content = styled.main`
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

const StyledHeader = styled.header`
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('grayscale', 0)};
  height: calc(${size('header.home.heroImage.mobileHeight')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const SearchBoxWrapper = styled.div`
  margin: auto;
  width: ${size('layout.col12')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.regular')};
`;
const StyledLabel = styled(Label)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const HowItWorksPage = ({ onLocationSearch, hasStickyFooter }) => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <StyledImage src={assetPath('images/how-it-works/hero.png')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find a Home to Love
          </StyledHeading>
          <StyledLabel palette="white">
            Your search for housing and care has never been easier
          </StyledLabel>
        </SearchBoxWrapper>
      </HeroWrapper>
    </Fragment>
  );
  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <StyledHeader>{HeaderContent}</StyledHeader>
      <Content><div>Hello</div></Content>
      <footer><Footer /></footer>
      <ChatBoxContainer pageWithStickyFooter={hasStickyFooter} />
    </Fragment>
  );
};

export default HowItWorksPage;
