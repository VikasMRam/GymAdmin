import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Heading } from 'sly/components/atoms';
import Header from 'sly/components/organisms/Header';
import Footer from 'sly/components/organisms/Footer';
import SearchBox from 'sly/components/molecules/SearchBox';

const headerItems = [
  { name: 'Resources', url: '#' },
  { name: 'Moving Center', url: '#' },
  { name: 'News', url: '#' },
  { name: 'List Your Property', url: '#' },
  { name: 'Our History', url: '#' },
  { name: 'Sign in', url: '#' },
];

const HeroWrapper = styled.div`
  position: relative;
  padding-top: 15%;
  padding-bottom: 15%;
  background-color: ${palette('grayscale', 0)};

  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    z-index: 0;
  }
`;
const SearchBoxWrapper = styled.div`
  margin: auto;
  position: relative;
  width: 90%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.homeHeroSearchBar.width')};
  }
`;
const StyledHeading = styled(Heading)`
  text-align: center;
`;

const HomePage = () => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Header headerItems={headerItems} />
      <HeroWrapper>
        <Image src={assetPath('images/homepage-cover.png')} alt="hero image" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" palette="white">Find a Home to Love</StyledHeading>
          <SearchBox layout="homeHero" />
        </SearchBoxWrapper>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Footer />}
    >
    blah
    </BasePageTemplate>
  );
};

export default HomePage;
