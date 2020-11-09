import React from 'react';
import styled from 'styled-components';
import { bool, func, string, object } from 'prop-types';

import { host } from 'sly/web/config';
import { size, palette, getKey } from 'sly/common/components/themes';
import { gridColumns, assetPath } from 'sly/web/components/themes';
import { ALSeoCities, ALSeoStates } from 'sly/web/services/helpers/homepage';
import SlyEvent from 'sly/web/services/helpers/events';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { Label, Heading, Block, Button, Hr, Link, Paragraph } from 'sly/common/components/atoms';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';
import Section from 'sly/web/components/molecules/Section';
import DiscoverHomeTile from 'sly/web/components/molecules/DiscoverHomeTile';
import MeetOthersTile from 'sly/web/components/molecules/MeetOthersTile';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import Footer from 'sly/web/components/organisms/Footer';
import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import ContentOverImage, { MiddleContent } from 'sly/web/components/molecules/ContentOverImage';
import { getHelmetForHomePage } from 'sly/web/services/helpers/html_headers';

const SearchBoxWrapper = styled(MiddleContent)`
  width: 90%;

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

const StyledSection = styled(Section)`
  text-align: center;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;
const TwoColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(2, size('spacing.xLarge'))};
  }
`;

const ThreeColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(3, size('spacing.xLarge'))};
  }
`;

const UIColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(2, size('spacing.xLarge'))};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    ${gridColumns(3, size('spacing.xLarge'))};
  }
`;

const MSCColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(2, size('spacing.xLarge'))};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    ${gridColumns(4, size('spacing.xLarge'))};
  }
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CWTImage = styled(ResponsiveImage)`
  margin-bottom: ${size('spacing.regular')};
  height: ${size('picture.tiny.height')};
`;

const CWTColumnWrapper = styled.div`
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

const VideoSection = styled(StyledSection)`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
  }
`;

const CenteredTile = styled(({
  title, to, alt, image, children, ...props
}) => (
  <StyledLink key={title} to={to} {...props}>
    <ResponsiveImage path={image} alt={alt} aspectRatio="3:2">
      <Centered>
        {children}
      </Centered>
    </ResponsiveImage>
  </StyledLink>
))`
  overflow: hidden;
  border-radius: ${size('spacing.small')};
`;

const firstRowDiscoverHomes = [
  {
    title: 'Assisted Living',
    description: 'Living that includes assistance with activities of daily living (ADLs)',
    image: 'react-assets/home/discover-home/assisted-living.jpeg',
    alt: 'assisted living senior living seniorly',
    buttonText: 'See more',
    searchParams: { toc: 'assisted-living' },
  },
  {
    title: 'Board and Care Home',
    description: 'A residential personal care home that’s usually more affordable',
    image: 'react-assets/home/discover-home/care-home.jpeg',
    alt: 'board and care home senior living seniorly',
    buttonText: 'See more',
    searchParams: { size: 'small' },
  },

];

const secondRowDiscoverHomes = [
  {
    title: 'Luxury Assisted Living',
    description: 'The ultimate in comfort, care and community',
    image: 'react-assets/home/discover-home/1-bedroom-tile.jpeg',
    alt: 'luxury assisted living senior living seniorly',
    buttonText: 'See more',
    searchParams: { size: 'large', budget: 5000 },
  },
  {
    title: 'Memory Care Options',
    description: 'For those with Alzheimer’s, Dementia and more',
    image: 'react-assets/home/discover-home/shared-rooms-tile.jpeg',
    alt: 'memory care senior living seniorly',
    buttonText: 'See more',
    searchParams: { toc: 'memory-care' },
  },
  {
    title: 'More Senior Living',
    description: 'Compare all retirement community features, cost, photos and reviews',
    image: 'react-assets/home/discover-home/studios-tile.jpeg',
    alt: 'senior living seniorly',
    buttonText: 'See more',
    searchParams: {},
  },
];

const usefulInformationTiles = [
  {
    to: '/independent-living',
    image: 'react-assets/home/useful-info/independent-living.jpg',
    alt: 'independent living senior living seniorly',
    title: 'Independent Living',
  },
  {
    to: '/assisted-living',
    image: 'react-assets/home/useful-info/assisted-living.jpg',
    alt: 'assisted living senior living seniorly',
    title: 'Assisted Living',
  },
  {
    to: '/memory-care',
    image: 'react-assets/home/useful-info/memory-care.jpg',
    alt: 'memory care senior living seniorly',
    title: 'Memory Care',
  },
  {
    to: '/board-and-care-home',
    image: 'react-assets/home/useful-info/board-and-care.jpg',
    alt: 'board and care home senior living seniorly',
    title: 'Board & Care Home',
  },
  /* {
    to: '#',
    image: 'react-assets/home/useful-info/skilled-nursing.jpeg',
    title: 'Skilled Nursing',
  }, */
  {
    to: '/continuing-care-retirement-community',
    image: 'react-assets/home/useful-info/ccrc.jpg',
    alt: 'ccrc senior living seniorly',
    title: 'CCRC / Life Plan',
  },
  {
    to: '/resources',
    image: 'react-assets/home/useful-info/more-resources.jpg',
    alt: 'more senior living resources seniorly',
    title: 'More Resources',
  },
];

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: 'react-assets/cities/SanFrancisco.jpeg',
    alt: 'san francisco assisted living seniorly',
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: 'react-assets/cities/LosAngeles.jpeg',
    alt: 'los angeles assisted living seniorly',
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: 'react-assets/cities/SanDiego.jpeg',
    alt: 'san diego assisted living seniorly',
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
  {
    to: '/assisted-living/texas/dallas',
    image: 'react-assets/cities/Dallas.jpeg',
    alt: 'dallas assisted living seniorly',
    subtitle: 'Dallas, TX',
    title: '90+ communities',
  },
  {
    to: '/assisted-living/florida/miami',
    image: 'react-assets/cities/Miami.jpeg',
    alt: 'miami assisted living seniorly',
    subtitle: 'Miami, FL',
    title: '150+ communities',
  },
  {
    to: '/assisted-living/arizona/phoenix',
    image: 'react-assets/cities/Pheonix.jpeg',
    alt: 'phoenix assisted living seniorly',
    subtitle: 'Phoenix, AZ',
    title: '151+ communities',
  },
  {
    to: '/assisted-living/florida/orlando',
    image: 'react-assets/cities/Orlando.jpeg',
    alt: 'orlando assisted living seniorly',
    subtitle: 'Orlando, FL',
    title: '60+ communities',
  },
  {
    to: '/assisted-living/florida/sacramento',
    image: 'react-assets/cities/Sacramento.jpeg',
    alt: 'sacramento assisted living seniorly',
    subtitle: 'Sacramento, CA',
    title: '150+ communities',
  },
];

const familiesWeHaveHelpedTiles = [
  {
    image: 'react-assets/home/meet-others/Sharon.jpg',
    title: 'Sharon T.',
    description: '"I felt like Seniorly was a lifesaver! I was daunted at the prospect of going through so many possibilities to find the right fit for my mom in such a short time, while taking care of so many other things that need attending as we deal with the aftermath of her stroke."',
  },
  {
    image: 'react-assets/home/meet-others/Kathy.jpg',
    title: 'Aileen H.',
    description: '"I was very frustrated that every time I wanted to see the price of a facility that I had to give my phone number and I would get bombarded with calls. Your site was the only one that allowed me to search on my own time and it listed more info than other sites."',
  },
  {
    image: 'react-assets/home/meet-others/Henry.jpg',
    title: 'Henry W.',
    description: '"We were lucky enough to find a great place for my father-in-law. Seniorly is a really helpful website, very helpful and informative. Thank you so much for what you do."',
  },
];

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const HomePage = ({
  showModal, hideModal, onLocationSearch, setActiveDiscoverHome, ishowSlyWorksVideoPlaying,
  toggleHowSlyWorksVideoPlaying, onCurrentLocation,
}) => {
  const HeaderContent = (
    <>
      <HeaderContainer />
      {/*<BannerNotificationAdContainer type="wizardHome" noMarginBottom />*/}
      <ContentOverImage
        image="react-assets/home/cover5.jpg"
        imageAlt="A Home To Love"
        imageHeight={640}
        mobileHeight={getKey('sizes.header.home.heroImage.mobileHeight')}
        tabletHeight={getKey('sizes.header.home.heroImage.height')}
        laptopHeight={getKey('sizes.header.home.heroImage.height')}
      >
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find The Best Senior Living Near You
          </StyledHeading>
          <StyledLabel palette="white">
            Search Assisted Living, Memory Care, Nursing Homes and More
          </StyledLabel>
          <SearchBoxContainer
            onCurrentLocation={onCurrentLocation}
            layout="homeHero"
            onLocationSearch={onLocationSearch}
            include="community"
            placeholder="Search by city, zip, community name"
          />
        </SearchBoxWrapper>
      </ContentOverImage>
    </>
  );

  const onButtonClick = (discoverHome) => {
    const modalContent = (
      <>
        <Heading size="subtitle">Please enter a location:</Heading>
        <SearchBoxContainer
          layout="homeHero"
          onLocationSearch={(e) => {
            hideModal();
            onLocationSearch(e, true);
          }}
        />
      </>
    );
    const onClose = () => {
      setActiveDiscoverHome();
      hideModal();
    };

    setActiveDiscoverHome(discoverHome);
    showModal(modalContent, onClose, 'searchBox');
  };


  const firstRowDiscoverHomesComponents = firstRowDiscoverHomes.map(discoverHome => (
    <DiscoverHomeTile
      key={discoverHome.title}
      title={discoverHome.title}
      description={discoverHome.description}
      image={discoverHome.image}
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
      buttonText={discoverHome.buttonText}
      onButtonClick={() => onButtonClick(discoverHome)}
    />
  ));

  const usefulInformationTilesComponents = usefulInformationTiles.map(usefulInformation => (
    <CenteredTile key={usefulInformation.title} {...usefulInformation}>
      <Heading palette="white">{usefulInformation.title}</Heading>
    </CenteredTile>
  ));

  const mostSearchedCitiesComponents = mostSearchedCities.map(mostSearchedCity => (
    <CenteredTile key={mostSearchedCity.subtitle} size="body" {...mostSearchedCity}>
      <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
      <Block palette="white">{mostSearchedCity.title}</Block>
    </CenteredTile>
  ));

  const familiesWeHaveHelpedTilesComponents = familiesWeHaveHelpedTiles.map(familyWeHaveHelped => (
    <MeetOthersTile
      key={familyWeHaveHelped.title}
      image={familyWeHaveHelped.image}
      title={familyWeHaveHelped.title}
      description={familyWeHaveHelped.description}
    />
  ));

  const canonicalUrl = `${host}`;
  const significantLinks = usefulInformationTiles.map(info => info.to);
  const header = getHelmetForHomePage({ canonicalUrl, significantLinks });
  return (
    <>
      {header}
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <VideoSection title="How Seniorly Can Help You Find The Best Senior Living Options" id="watch-video">
          <StyledBlock>
            This short video will explain how Seniorly can help you find the best assisted living or any senior living community.{' '}
            <Link href="tel:+18558664515">Call us at (855) 866-4515.</Link>
          </StyledBlock>
          <HowSlyWorksVideo
            isPlaying={ishowSlyWorksVideoPlaying}
            onThumbnailClick={toggleHowSlyWorksVideoPlaying}
            onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', 'home', e.target.currentTime)}
            onPlay={e => sendEvent('howSlyWorksVideo', 'play', 'home', e.target.currentTime)}
          />
        </VideoSection>
        <Hr />
        <StyledSection title="Discover The Best Senior Living Near You" subtitle=" Our search is simple, the results are comprehensive and all information is fully transparent">
          <TwoColumnWrapper>
            {firstRowDiscoverHomesComponents}
          </TwoColumnWrapper>
          <ThreeColumnWrapper>
            {secondRowDiscoverHomesComponents}
          </ThreeColumnWrapper>
        </StyledSection>
        <Hr />
        <StyledSection title="Let Us Help You Find The Best Senior Living" subtitle="Here's what others have said">
          <ThreeColumnWrapper>
            {familiesWeHaveHelpedTilesComponents}
          </ThreeColumnWrapper>
        </StyledSection>
        <Hr />
        <StyledSection title="Useful Senior Living Resources" subtitle="Get expert planning information for families and caregivers">
          <UIColumnWrapper>
            {usefulInformationTilesComponents}
          </UIColumnWrapper>
        </StyledSection>
        <Hr />
        <StyledSection title="Most Searched Cities for Senior Living">
          <Paragraph>
            Find the best assisted living facilities, memory care communities and more within 8 of the most searched
            cities in the United States. From{' '}
            <Link href="https://www.seniorly.com/assisted-living/california/los-angeles">
              Los Angeles
            </Link>
            {' '}and{' '}
            <Link href="https://www.seniorly.com/assisted-living/california/sacramento">
              Sacramento
            </Link>
            {' '}to{' '}
            <Link href="https://www.seniorly.com/assisted-living/texas/dallas">
              Dallas
            </Link>
            {' '}and{' '}
            <Link href="https://www.seniorly.com/assisted-living/florida/orlando">
              Orlando
            </Link>
            , you will find photos, estimated cost per month, unique property highlights and more
          </Paragraph>
          <MSCColumnWrapper>
            {mostSearchedCitiesComponents}
          </MSCColumnWrapper>
        </StyledSection>
        <Hr />
        <StyledSection title="Corporate Senior Living Partners">
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
          <CWTColumnWrapper>
            <StyledBlock size="subtitle">Become A Seniorly Partner Community</StyledBlock>
            <Button href="/partners/communities" kind="jumbo">Create Account</Button>
          </CWTColumnWrapper>
        </StyledSection>
        <SeoLinks title="Assisted Living by City" links={ALSeoCities} />
        <SeoLinks title="Assisted Living by State" links={ALSeoStates} />
      </TemplateContent>
      <Footer />
    </>
  );
};

HomePage.propTypes = {
  onLocationSearch: func,
  setActiveDiscoverHome: func,
  pathName: string,
  queryParams: object,
  setQueryParams: func,
  ishowSlyWorksVideoPlaying: bool,
  toggleHowSlyWorksVideoPlaying: func,
  showModal: func,
  hideModal: func,
  history: object,
  onCurrentLocation: func,
};

export default HomePage;
