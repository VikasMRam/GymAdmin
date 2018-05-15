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
import MeetOthersTile from 'sly/components/molecules/MeetOthersTile';

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
        <Image src={assetPath('images/home/cover.png')} alt="hero image" />
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
            image={assetPath('images/home/discover-home/independent-living-tile.png')}
            title="Independent Living"
            description="200 properties starting from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            image={assetPath('images/home/discover-home/alzheimers-care-tile.png')}
            title="Alzheimer's Care"
            description="200 properties starting from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
        </ColumnWrapper>
        <br />
        <ColumnWrapper>
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-home/studios-tile.png')}
            title="Studios"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-home/shared-rooms-tile.png')}
            title="Shared Rooms"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
          <DiscoverHomeTile
            size="regular"
            image={assetPath('images/home/discover-home/1-bedroom-tile.png')}
            title="1 Bedroom"
            description="200 properties from $4,000"
            link={{ text: 'See more', href: '#' }}
          />
        </ColumnWrapper>
      </StyledSection>
      <br />
      <StyledHr />
      <StyledSection title="Meet others we've helped">
        <ColumnWrapper>
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female1-tile.png')}
            title="Middle-aged adult female child #1"
            description={'"Family Caregiver Alliance provides “online educational materials in terms of fact sheets, videos, and online support groups" which are invaluable to family caregivers and their families.'}
          />
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female2-tile.png')}
            title="Middle-aged adult female child #2"
            description={'"Family Caregiver Alliance provides “online educational materials in terms of fact sheets, videos, and online support groups" which are invaluable to family caregivers and their families.'}
          />
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female3-tile.png')}
            title="Middle-aged adult female child #3"
            description={'"Family Caregiver Alliance provides “online educational materials in terms of fact sheets, videos, and online support groups" which are invaluable to family caregivers and their families.'}
          />
        </ColumnWrapper>
      </StyledSection>
      <br />
      <StyledHr />
    </BasePageTemplate>
  );
};

export default HomePage;
