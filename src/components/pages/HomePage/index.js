import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Heading, Hr, Link, Block, Button } from 'sly/components/atoms';
import Header from 'sly/components/organisms/Header';
import Footer from 'sly/components/organisms/Footer';
import SearchBox from 'sly/components/molecules/SearchBox';
import Section from 'sly/components/molecules/Section';
import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';
import MeetOthersTile from 'sly/components/molecules/MeetOthersTile';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';

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
  background-color: ${palette('grayscale', 0)};

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
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBar.width')};
  }
`;
const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.xxLarge')};
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-bottom: ${size('spacing.xLarge')};
    margin-right: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    justify-content: space-between;
    > * {
      margin-right: initial;
      margin-bottom: initial;
    }
  }
`;
const StyledHr = styled(Hr)`
  border-color: ${palette('primary', 3)};
`;
const UIColumnWrapper = ColumnWrapper.extend`
  > a {
    margin-bottom: ${size('spacing.large')};
  }
`;
const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;
const CWTColumnWrapper = ColumnWrapper.extend`
  width: 100%;
  margin: auto;

  @media screen and (min-width: ${size('home.companiesWeTrust.width')}) {
    width: ${size('home.companiesWeTrust.width')};
  }
`;

const HomePage = () => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Header headerItems={headerItems} />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover.png')} alt="hero image" />
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
      <StyledSection title="Useful Information">
        <UIColumnWrapper>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/independent-living.png')}>
              <Heading palette="white">Independent Living</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/assisted-living.png')}>
              <Heading palette="white">Assisted Living</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/memory-care.png')}>
              <Heading palette="white">Memory Care</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/board-and-care-residential.png')}>
              <Heading palette="white">Board & Care Residential</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/skilled-nursing.png')}>
              <Heading palette="white">Skilled Nursing</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/ccrc-life-plan.png')}>
              <Heading palette="white">CCRC / Life Plan</Heading>
            </ImageOverlayContentTile>
          </Link>
        </UIColumnWrapper>
      </StyledSection>
      <StyledHr />
      <StyledSection title="Most searched cities">
        <UIColumnWrapper>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/SanFrancisco.png')}>
              <Heading palette="white" level="subtitle">San Francisco, CA</Heading>
              <Block palette="white">200+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/LosAngeles.png')}>
              <Heading palette="white" level="subtitle">Los Angeles, CA</Heading>
              <Block palette="white">75+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/SanDiego.png')}>
              <Heading palette="white" level="subtitle">San Diego, CA</Heading>
              <Block palette="white">100+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Dallas.png')}>
              <Heading palette="white" level="subtitle">Dallas, TX</Heading>
              <Block palette="white">120+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Houston.png')}>
              <Heading palette="white" level="subtitle">Houston, TX</Heading>
              <Block palette="white">72+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Pheonix.png')}>
              <Heading palette="white" level="subtitle">Pheonix, AZ</Heading>
              <Block palette="white">151+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Orlando.png')}>
              <Heading palette="white" level="subtitle">Orlando, FL</Heading>
              <Block palette="white">130+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="#">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Miami.png')}>
              <Heading palette="white" level="subtitle">Miami, FL</Heading>
              <Block palette="white">80+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
        </UIColumnWrapper>
      </StyledSection>
      <StyledHr />
      <StyledSection>
        <UIColumnWrapper>
          <ImageOverlayContentTile size="large" image={assetPath('images/home/partner-with-us.png')}>
            <Heading palette="white">Partner With Us</Heading>
            <StyledBlock palette="white" level="subtitle">For Local Referral Agents</StyledBlock>
            <Button href="#">Get Started</Button>
          </ImageOverlayContentTile>
          <ImageOverlayContentTile size="large" image={assetPath('images/home/list-a-property.png')}>
            <Heading palette="white">List a Property</Heading>
            <StyledBlock palette="white" level="subtitle">For Senior Housing Providers</StyledBlock>
            <Button href="#">Get Started</Button>
          </ImageOverlayContentTile>
        </UIColumnWrapper>
      </StyledSection>
      <StyledHr />
      <StyledSection title="Companies We Trust">
        <br />
        <CWTColumnWrapper>
          <Link to="https://www.seniorly.com/resources/articles/seniorly-conversations-caregiver-resources" target="_blank">
            <Image src={assetPath('images/home/companies-we-trust/UCBerkeley.png')} />
          </Link>
          <Link to="https://www.nike.com" target="_blank">
            <Image src={assetPath('images/home/companies-we-trust/NIKE.png')} />
          </Link>
          <Link to="https://www.seniorly.com/assisted-living/articles/seniorly-conversations-staying-social-in-senior-housing-communities" target="_blank">
            <Image src={assetPath('images/home/companies-we-trust/Seniorly.png')} />
          </Link>
          <Link to="https://www.seniorly.com/resources/articles/seniorly-conversations-on-demand-transportation-for-older-adults" target="_blank">
            <Image src={assetPath('images/home/companies-we-trust/Lyft.png')} />
          </Link>
        </CWTColumnWrapper>
      </StyledSection>
    </BasePageTemplate>
  );
};

export default HomePage;
