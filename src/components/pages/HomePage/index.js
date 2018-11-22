import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, func, string, object } from 'prop-types';

import { size, assetPath, palette } from 'sly/components/themes';

import HeaderController from 'sly/controllers/HeaderController';

import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';

import { Image, Label, Heading, Hr, Link, Block, Button } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import Modal from 'sly/components/molecules/Modal';
import Section from 'sly/components/molecules/Section';
import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';
import MeetOthersTile from 'sly/components/molecules/MeetOthersTile';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'filler')};
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
  width: 90%;
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
const ImageCreditDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: ${size('spacing.large')};
  margin-right: ${size('spacing.large')};
`;
const ImageCreditLabel = styled.label`
  font-size: ${size('text', 'tiny')};
  color: ${palette('white', 0)};
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
const CWTImage = styled(Image)`
  margin-bottom: ${size('spacing.regular')};
  height: ${size('picture.tiny.height')};
`;
const CWTColumnWrapper = ColumnWrapper.extend`
  margin-bottom: ${size('spacing.xxLarge')};
  > * {
    margin-right: ${size('spacing.large')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    justify-content: center;
    > * {
      margin-right: ${size('spacing.huge')};
    }
  }
`;
// this is required for IE as it won't consider inline elements as flex children
const StyledLink = styled(Link)`
  display: block;
`;

const firstRowDiscoverHomes = [
  {
    title: 'Care Homes',
    description: 'Communities combining comfort and care',
    image: assetPath('images/home/discover-home/care-home.jpeg'),
    buttonText: 'See more',
    size: 'xLarge',
    searchParams: { size: 'small' },
  },
  {
    title: 'Assisted Living',
    description: 'Specializing in all of your daily care needs',
    image: assetPath('images/home/discover-home/assisted-living.jpeg'),
    buttonText: 'See more',
    size: 'xLarge',
    searchParams: { toc: 'assisted-living' },
  },
];

const secondRowDiscoverHomes = [
  {
    title: 'Boutique',
    description: 'More services in an intimate home-like setting',
    image: assetPath('images/home/discover-home/studios-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { size: 'medium' },
  },
  {
    title: 'Luxury',
    description: 'The ultimate in comfort, care and community',
    image: assetPath('images/home/discover-home/1-bedroom-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { size: 'large', budget: 5000 },
  },
  {
    title: 'Memory Care',
    description: 'For those with Alzheimer’s, Dementia and more',
    image: assetPath('images/home/discover-home/shared-rooms-tile.jpeg'),
    buttonText: 'See more',
    searchParams: { toc: 'memory-care' },
  },
];

const usefulInformationTiles = [
  {
    to: '/independent-living',
    image: assetPath('images/home/useful-info/independent-living.jpg'),
    title: 'Independent Living',
  },
  {
    to: '/assisted-living',
    image: assetPath('images/home/useful-info/assisted-living.jpg'),
    title: 'Assisted Living',
  },
  {
    to: '/memory-care',
    image: assetPath('images/home/useful-info/memory-care.jpg'),
    title: 'Memory Care',
  },
  {
    to: '/board-and-care-home',
    image: assetPath('images/home/useful-info/board-and-care.jpg'),
    title: 'Board & Care Residential',
  },
  /* {
    to: '#',
    image: assetPath('images/home/useful-info/skilled-nursing.jpeg'),
    title: 'Skilled Nursing',
  }, */
  {
    to: '/continuing-care-retirement-community',
    image: assetPath('images/home/useful-info/ccrc.jpg'),
    title: 'CCRC / Life Plan',
  },
  {
    to: '/resources',
    image: assetPath('images/home/useful-info/more-resources.jpg'),
    title: 'More Resources',
  },
];

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: assetPath('images/cities/LosAngeles.jpeg'),
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: assetPath('images/cities/SanDiego.jpeg'),
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
  {
    to: '/assisted-living/texas/dallas',
    image: assetPath('images/cities/Dallas.jpeg'),
    subtitle: 'Dallas, TX',
    title: '90+ communities',
  },
  {
    to: '/assisted-living/texas/houston',
    image: assetPath('images/cities/Houston.jpeg'),
    subtitle: 'Houston, TX',
    title: '72+ communities',
  },
  {
    to: '/assisted-living/arizona/phoenix',
    image: assetPath('images/cities/Pheonix.jpeg'),
    subtitle: 'Phoenix, AZ',
    title: '151+ communities',
  },
  {
    to: '/assisted-living/florida/orlando',
    image: assetPath('images/cities/Orlando.jpeg'),
    subtitle: 'Orlando, FL',
    title: '60+ communities',
  },
  {
    to: '/assisted-living/florida/miami',
    image: assetPath('images/cities/Miami.jpeg'),
    subtitle: 'Miami, FL',
    title: '150+ communities',
  },
];

const familiesWeHaveHelpedTiles = [
  {
    image: assetPath('images/home/meet-others/Sharon.jpg'),
    title: 'Sharon T.',
    description: '"I felt like Seniorly was a lifesaver! I was daunted at the prospect of going through so many possibilities to find the right fit for my mom in such a short time, while taking care of so many other things that need attending as we deal with the aftermath of her stroke."',
  },
  {
    image: assetPath('images/home/meet-others/Kathy.jpg'),
    title: 'Aileen H.',
    description: '"I was very frustrated that every time I wanted to see the price of a facility that I had to give my phone number and I would get bombarded with calls. Your site was the only one that allowed me to search on my own time and it listed more info than other sites."',
  },
  {
    image: assetPath('images/home/meet-others/Henry.jpg'),
    title: 'Henry W.',
    description: '"We were lucky enough to find a great place for my father-in-law. Seniorly is a really helpful website, very helpful and informative. Thank you so much for what you do."',
  },
];

const HomePage = ({
  isModalOpen, onLocationSearch, setActiveDiscoverHome, queryParams, setQueryParams, pathName,
}) => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderController />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find a Home to Love
          </StyledHeading>
          <StyledLabel palette="white">
            Your search for housing and care has never been easier
          </StyledLabel>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
        <ImageCreditDiv>
          <ImageCreditLabel palette="white">
            Sagebrook Senior Living San Francisco
          </ImageCreditLabel>
        </ImageCreditDiv>
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

  const usefulInformationTilesComponents = usefulInformationTiles.map(usefulInformation => (
    <StyledLink key={usefulInformation.title} to={usefulInformation.to}>
      <ImageOverlayContentTile image={usefulInformation.image}>
        <Heading palette="white">{usefulInformation.title}</Heading>
      </ImageOverlayContentTile>
    </StyledLink>
  ));

  const mostSearchedCitiesComponents = mostSearchedCities.map(mostSearchedCity => (
    <StyledLink key={mostSearchedCity.title} to={mostSearchedCity.to}>
      <ImageOverlayContentTile size="small" image={mostSearchedCity.image}>
        <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
        <Block palette="white">{mostSearchedCity.title}</Block>
      </ImageOverlayContentTile>
    </StyledLink>
  ));

  const familiesWeHaveHelpedTilesComponents = familiesWeHaveHelpedTiles.map(familyWeHaveHelped => (
    <MeetOthersTile
      key={familyWeHaveHelped.title}
      image={familyWeHaveHelped.image}
      title={familyWeHaveHelped.title}
      description={familyWeHaveHelped.description}
    />
  ));

  return (
    <Fragment>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Modal layout="searchBox" closeable onClose={() => setActiveDiscoverHome(null)} isOpen={isModalOpen}><Heading>Please enter a location:</Heading><SearchBoxContainer layout="homeHero" onLocationSearch={e => onLocationSearch(e, true)} /></Modal>
        <StyledSection title="Discover Homes Near You">
          <TwoColumnWrapper>
            {firstRowDiscoverHomesComponents}
          </TwoColumnWrapper>
          <ThreeColumnWrapper>
            {secondRowDiscoverHomesComponents}
          </ThreeColumnWrapper>
        </StyledSection>
        <br />
        <Hr />
        <StyledSection title="Meet Families We’ve Helped">
          <ThreeColumnWrapper>
            {familiesWeHaveHelpedTilesComponents}
          </ThreeColumnWrapper>
        </StyledSection>
        <br />
        <Hr />
        <StyledSection title="Useful Information">
          <UIColumnWrapper>
            {usefulInformationTilesComponents}
          </UIColumnWrapper>
        </StyledSection>
        <Hr />
        <StyledSection title="Most Searched Cities">
          <MSCColumnWrapper>
            {mostSearchedCitiesComponents}
          </MSCColumnWrapper>
        </StyledSection>
        <Hr />
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
        <Hr />
        <StyledSection title="Corporate Partners">
          <CWTColumnWrapper>
            <CWTImage src={assetPath('images/home/companies-we-trust/Brookdale_BW.png')} alt="Brookdale Senior Living Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/SunriseSeniorLiving_BW.png')} alt="SunriseSenior Living Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/HolidayRetirement_BW.png')} alt="Holidat Retirement" />
            <CWTImage src={assetPath('images/home/companies-we-trust/PacificaSeniorLiving_BW.png')} alt="Pacifica Senior Living Logo" />
          </CWTColumnWrapper>
          <CWTColumnWrapper>
            <CWTImage src={assetPath('images/home/companies-we-trust/HomeCareAssistance_BW.png')} alt="Home Care Assistance Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/FCA_BW.png')} alt="Family Caregiver Alliance Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/SeniorCareAuthority_BW.png')} alt="SeniorCareAuthority Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/AssistedLivingLocators_BW.png')} alt="Assisted Living Locators Logo" />
          </CWTColumnWrapper>
        </StyledSection>
        <ConciergeContainer pathName={pathName} queryParams={queryParams} setQueryParams={setQueryParams} />
        <SeoLinks title="Assisted living by Cities" links={ALSeoCities} />
        <SeoLinks title="Assisted living by State" links={ALSeoStates} />
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

HomePage.propTypes = {
  isModalOpen: bool,
  onLocationSearch: func,
  setActiveDiscoverHome: func,
  pathName: string,
  queryParams: object,
  setQueryParams: func,
};

export default HomePage;
