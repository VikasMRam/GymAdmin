import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Heading, Hr, Link, Block, Button } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import Modal from 'sly/components/molecules/Modal';
import Section from 'sly/components/molecules/Section';
import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';
import MeetOthersTile from 'sly/components/molecules/MeetOthersTile';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const headerItems = [
  { name: 'Resources', url: '/resources' },
  // { name: 'Moving Center', url: '#' },
  // { name: 'News', url: '#' },
  { name: 'List Your Property', url: '/providers' },
  { name: 'Our History', url: '/about' },
  { name: 'Sign in', url: '/signin' },
];

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('grayscale', 0)};
  height: calc(${size('header.home.heroImage.height')}/2);

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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: ${size('spacing.xLarge')};
  }
  > *:last-child {
    margin-right: 0;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
const TwoColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-right: 0;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;
const ThreeColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-right: 0;
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > *:first-child {
      margin-right: ${size('spacing.xLarge')};
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;
const StyledHr = styled(Hr)`
  border-color: ${palette('primary', 3)};
`;
const UIColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > *:nth-child(odd) {
      margin-right: ${size('spacing.xLarge')};
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(3n) {
      margin-right: 0;
    }
  }
`;
const MSCColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > *:nth-child(odd) {
      margin-right: ${size('spacing.xLarge')};
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(4n) {
      margin-right: 0;
    }
  }
`;
const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;
/* const CWTColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-right: ${size('spacing.large')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    justify-content: center;
    > * {
      margin-right: ${size('spacing.huge')};
    }
  }
`; */

const firstRowDiscoverHomes = [
  {
    title: 'Care Homes',
    description: 'Small communities in a home-like setting',
    image: assetPath('images/home/discover-home/independent-living-tile.jpeg'),
    buttonText: 'See more',
    size: 'xLarge',
    searchParams: { size: 'small' },
  },
  {
    title: 'Assisted Living',
    description: 'Communities with care services',
    image: assetPath('images/home/discover-home/alzheimers-care-tile.jpeg'),
    buttonText: 'See more',
    size: 'xLarge',
    searchParams: { toc: 'assisted-living' },
  },
];

const secondRowDiscoverHomes = [
  {
    title: 'Boutique',
    description: 'Unique communities with Activities and Services',
    image: assetPath('images/home/discover-home/studios-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { size: 'medium' },
  },
  {
    title: 'Luxury',
    description: 'High-end Senior Living',
    image: assetPath('images/home/discover-home/1-bedroom-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { size: 'large', budget: 5000 },
  },
  {
    title: 'Memory Care',
    description: 'Specialized Memory care programs available',
    image: assetPath('images/home/discover-home/shared-rooms-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { toc: 'alzheimers-care' },
  },
];

const HomePage = ({ isModalOpen, onLocationSearch, setActiveDiscoverHome }) => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer headerItems={headerItems} onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover-1.jpg')} alt="hero image" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" palette="white">
            Find a Home to Love
          </StyledHeading>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
      </HeroWrapper>
    </Fragment>
  );

  const onButtonClick = (discoverHome) => {
    setActiveDiscoverHome(discoverHome);
  };

  const firstRowDiscoverHomesComponents = firstRowDiscoverHomes.map(discoverHome => (
    <DiscoverHomeTile
      key={discoverHome.title}
      title={discoverHome.title}
      description={discoverHome.description}
      image={discoverHome.image}
      size={discoverHome.size}
      buttonText={discoverHome.buttonText}
      onButtonClick={() => onButtonClick(discoverHome)}
    />
  ));

  const secondRowDiscoverHomesComponents = secondRowDiscoverHomes.map(discoverHome => (
    <DiscoverHomeTile
      key={discoverHome.title}
      title={discoverHome.title}
      description={discoverHome.description}
      image={discoverHome.image}
      size={discoverHome.size}
      buttonText={discoverHome.buttonText}
      onButtonClick={() => onButtonClick(discoverHome)}
    />
  ));

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Footer />}
    >
      <Modal closeable onClose={() => setActiveDiscoverHome(null)} isOpen={isModalOpen}><Heading>Please enter a location:</Heading><SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} /></Modal>
      <StyledSection title="Discover Favorite Homes">
        <TwoColumnWrapper>
          {firstRowDiscoverHomesComponents}
        </TwoColumnWrapper>
        <ThreeColumnWrapper>
          {secondRowDiscoverHomesComponents}
        </ThreeColumnWrapper>
      </StyledSection>
      <br />
      <StyledHr />
      <StyledSection title="Meet others we've helped">
        <ThreeColumnWrapper>
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female1-tile.jpeg')}
            title="Sharon T."
            description="“I felt like Seniorly was a lifesaver! I was daunted at the prospect of going through so many possibilities to find the right fit for my mom in such a short time, while taking care of so many other things that need attending as we deal with the aftermath of her stroke.”"
          />
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female2-tile.jpeg')}
            title="Kathy O."
            description="It’s such a wonderful comfort to be able to view the pictures, video and information on the Seniorly website. The Seniorly staff is also responsive, kind and compassionate. Thank you for caring about this community and the needs of future generations!”"
          />
          <MeetOthersTile
            image={assetPath('images/home/meet-others/female3-tile.jpeg')}
            title="Henry W."
            description="“We were lucky enough to find a great place for my father-in-law. Seniorly is a really helpful website, very helpful and informative. Thank you so much for what you do.”"
          />
        </ThreeColumnWrapper>
      </StyledSection>
      <br />
      <StyledHr />
      <StyledSection title="Useful Information">
        <UIColumnWrapper>
          <Link to="/independent-living">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/independent-living.jpeg')}>
              <Heading palette="white">Independent Living</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/assisted-living.jpeg')}>
              <Heading palette="white">Assisted Living</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/alzheimers-care">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/memory-care.jpeg')}>
              <Heading palette="white">Memory Care</Heading>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/board-and-care-home">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/board-and-care-residential.jpeg')}>
              <Heading palette="white">Board & Care Residential</Heading>
            </ImageOverlayContentTile>
          </Link>
          {/* <Link to="#"> */}
          {/* <ImageOverlayContentTile image={assetPath('images/home/useful-info/skilled-nursing.jpeg')}> */}
          {/* <Heading palette="white">Skilled Nursing</Heading> */}
          {/* </ImageOverlayContentTile> */}
          {/* </Link> */}
          <Link to="/continuing-care-retirement-community">
            <ImageOverlayContentTile image={assetPath('images/home/useful-info/ccrc-life-plan.jpeg')}>
              <Heading palette="white">CCRC / Life Plan</Heading>
            </ImageOverlayContentTile>
          </Link>
        </UIColumnWrapper>
      </StyledSection>
      <StyledHr />
      <StyledSection title="Most searched cities">
        <MSCColumnWrapper>
          <Link to="/assisted-living/california/san-francisco">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/SanFrancisco.jpeg')}>
              <Heading palette="white" level="subtitle">San Francisco, CA</Heading>
              <Block palette="white">200+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/california/los-angeles">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/LosAngeles.jpeg')}>
              <Heading palette="white" level="subtitle">Los Angeles, CA</Heading>
              <Block palette="white">75+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/california/san-diego">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/SanDiego.jpeg')}>
              <Heading palette="white" level="subtitle">San Diego, CA</Heading>
              <Block palette="white">100+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/texas/dallas">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Dallas.jpeg')}>
              <Heading palette="white" level="subtitle">Dallas, TX</Heading>
              <Block palette="white">120+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/texas/houston">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Houston.jpeg')}>
              <Heading palette="white" level="subtitle">Houston, TX</Heading>
              <Block palette="white">72+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/arizona/phoenix">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Pheonix.jpeg')}>
              <Heading palette="white" level="subtitle">Phoenix, AZ</Heading>
              <Block palette="white">151+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/florida/orlando">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Orlando.jpeg')}>
              <Heading palette="white" level="subtitle">Orlando, FL</Heading>
              <Block palette="white">130+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
          <Link to="/assisted-living/florida/miami">
            <ImageOverlayContentTile size="small" image={assetPath('images/cities/Miami.jpeg')}>
              <Heading palette="white" level="subtitle">Miami, FL</Heading>
              <Block palette="white">80+ communities</Block>
            </ImageOverlayContentTile>
          </Link>
        </MSCColumnWrapper>
      </StyledSection>
      <StyledHr />
      <StyledSection>
        <TwoColumnWrapper>
          <ImageOverlayContentTile size="xLarge" image={assetPath('images/home/partner-with-us.jpeg')}>
            <Heading palette="white">Partner With Us</Heading>
            <StyledBlock palette="white" level="subtitle">For Local Referral Agents</StyledBlock>
            <Button to="/providers/crm">Get Started</Button>
          </ImageOverlayContentTile>
          <ImageOverlayContentTile size="xLarge" image={assetPath('images/home/list-a-property.jpeg')}>
            <Heading palette="white">List a Property</Heading>
            <StyledBlock palette="white" level="subtitle">For Senior Housing Providers</StyledBlock>
            <Button to="/providers/housing">Get Started</Button>
          </ImageOverlayContentTile>
        </TwoColumnWrapper>
      </StyledSection>
      {/* <StyledHr />
      <StyledSection title="Communities We Trust">
        <br />
        <CWTColumnWrapper>
          <StyledImage src={assetPath('images/home/communities-we-trust/bhsl.png')} />
          <Image src={assetPath('images/home/communities-we-trust/brookdale.png')} />
          <Image src={assetPath('images/home/communities-we-trust/integral.png')} />
          <Image src={assetPath('images/home/communities-we-trust/pacifica.png')} />
          <Image src={assetPath('images/home/communities-we-trust/Lyft.png')} />
        </CWTColumnWrapper>
      </StyledSection> */}
    </BasePageTemplate>
  );
};

HomePage.propTypes = {
  isModalOpen: bool,
  onLocationSearch: func,
  setActiveDiscoverHome: func,
};

export default HomePage;
