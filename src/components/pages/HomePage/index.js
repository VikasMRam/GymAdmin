import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Heading, Hr } from 'sly/components/atoms';
import Header from 'sly/components/organisms/Header';
import Footer from 'sly/components/organisms/Footer';
import SearchBox from 'sly/components/molecules/SearchBox';
import Section from 'sly/components/molecules/Section';
import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';

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

  > img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    z-index: 0;
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.homeHeroImage.height')};
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
const StyledSection = styled(Section)`
  text-align: center;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  > div {
    margin-bottom: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    flex-direction: row;
    align-items: initial;

    > div {
      margin-bottom: initial;
    }
  }
`;
const StyledHr = styled(Hr)`
  border-color: ${palette('primary', 3)};
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
      <StyledSection title="Discover Favourite Homes">
        <ColumnWrapper>
          <DiscoverHomeTile
            image={assetPath('images/home/discover-independent-living-tile.png')}
            title="Independent Living"
            description="200 properties starting from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            image={assetPath('images/home/discover-alzheimers-care-tile.png')}
            title="Alzheimer's Care"
            description="200 properties starting from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
        </ColumnWrapper>
        <br />
        <ColumnWrapper>
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-studios-tile.png')}
            title="Studios"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-shared-rooms-tile.png')}
            title="Shared Rooms"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-1-bedroom-tile.png')}
            title="1 Bedroom"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
        </ColumnWrapper>
      </StyledSection>
      <br />
      <StyledHr />
    </BasePageTemplate>
  );
};

export default HomePage;
