import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { bool, func, string, object } from 'prop-types';

import { host } from 'sly/config';
import { size, assetPath, palette, gridColumns } from 'sly/components/themes';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
import SlyEvent from 'sly/services/helpers/events';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { Image, Centered, Label, Heading, Hr, Link, Block, Button, Paragraph } from 'sly/components/atoms';
import Section from 'sly/components/molecules/Section';
import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';
import MeetOthersTile from 'sly/components/molecules/MeetOthersTile';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import Footer from 'sly/components/organisms/Footer';
import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'filler')};
  height: ${size('header.home.heroImage.mobileHeight')};

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
  color: ${palette('white', 'base')};
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

const CWTImage = styled(Image)`
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
    <Image src={image} alt={alt} aspectRatio="3:2">
      <Centered>
        {children}
      </Centered>
    </Image>
  </StyledLink>
))`
  overflow: hidden;
  border-radius: ${size('spacing.small')};
`;

const firstRowDiscoverHomes = [
  {
    title: 'Assisted Living',
    description: 'Living that includes assistance with activities of daily living (ADLs)',
    image: assetPath('images/home/discover-home/assisted-living.jpeg'),
    alt: 'assisted-living-senior-living-seniorly',
    buttonText: 'See more',
    searchParams: { toc: 'assisted-living' },
  },
  {
    title: 'Board and Care Home',
    description: 'A residential personal care home that’s usually more affordable',
    image: assetPath('images/home/discover-home/care-home.jpeg'),
    alt: 'board-and-care-home-senior-living-seniorly',
    buttonText: 'See more',
    searchParams: { size: 'small' },
  },

];

const secondRowDiscoverHomes = [
  {
    title: 'Luxury Assisted Living',
    description: 'The ultimate in comfort, care and community',
    image: assetPath('images/home/discover-home/1-bedroom-tile.jpeg'),
    alt: 'luxury-assisted-living-senior-living-seniorly',
    buttonText: 'See more',
    searchParams: { size: 'large', budget: 5000 },
  },
  {
    title: 'Memory Care Options',
    description: 'For those with Alzheimer’s, Dementia and more',
    image: assetPath('images/home/discover-home/shared-rooms-tile.jpeg'),
    alt: 'memory-care-senior-living-seniorly',
    buttonText: 'See more',
    searchParams: { toc: 'memory-care' },
  },
  {
    title: 'More Senior Living',
    description: 'Compare community features, cost, and photos',
    image: assetPath('images/home/discover-home/studios-tile.jpeg'),
    alt: 'senior-living-seniorly',
    buttonText: 'See more',
    searchParams: {},
  },
];

const usefulInformationTiles = [
  {
    to: '/independent-living',
    image: assetPath('images/home/useful-info/independent-living.jpg'),
    alt: 'independent-living-senior-living-seniorly',
    title: 'Independent Living',
  },
  {
    to: '/assisted-living',
    image: assetPath('images/home/useful-info/assisted-living.jpg'),
    alt: 'assisted-living-senior-living-seniorly',
    title: 'Assisted Living',
  },
  {
    to: '/memory-care',
    image: assetPath('images/home/useful-info/memory-care.jpg'),
    alt: 'memory-care-senior-living-seniorly',
    title: 'Memory Care',
  },
  {
    to: '/board-and-care-home',
    image: assetPath('images/home/useful-info/board-and-care.jpg'),
    alt: 'board-and-care-home-senior-living-seniorly',
    title: 'Board & Care Home',
  },
  /* {
    to: '#',
    image: assetPath('images/home/useful-info/skilled-nursing.jpeg'),
    title: 'Skilled Nursing',
  }, */
  {
    to: '/continuing-care-retirement-community',
    image: assetPath('images/home/useful-info/ccrc.jpg'),
    alt: 'ccrc-senior-living-seniorly',
    title: 'CCRC / Life Plan',
  },
  {
    to: '/resources',
    image: assetPath('images/home/useful-info/more-resources.jpg'),
    alt: 'more-senior-living-resources-seniorly',
    title: 'More Resources',
  },
];

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    alt: 'san-francisco-assisted-living-seniorly',
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: assetPath('images/cities/LosAngeles.jpeg'),
    alt: 'los-angeles-assisted-living-seniorly',
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: assetPath('images/cities/SanDiego.jpeg'),
    alt: 'san-diego-assisted-living-seniorly',
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
  {
    to: '/assisted-living/texas/dallas',
    image: assetPath('images/cities/Dallas.jpeg'),
    alt: 'dallas-assisted-living-seniorly',
    subtitle: 'Dallas, TX',
    title: '90+ communities',
  },
  {
    to: '/assisted-living/florida/miami',
    image: assetPath('images/cities/Miami.jpeg'),
    alt: 'miami-assisted-living-seniorly',
    subtitle: 'Miami, FL',
    title: '150+ communities',
  },
  {
    to: '/assisted-living/arizona/phoenix',
    image: assetPath('images/cities/Pheonix.jpeg'),
    alt: 'phoenix-assisted-living-seniorly',
    subtitle: 'Phoenix, AZ',
    title: '151+ communities',
  },
  {
    to: '/assisted-living/florida/orlando',
    image: assetPath('images/cities/Orlando.jpeg'),
    alt: 'orlando-assisted-living-seniorly',
    subtitle: 'Orlando, FL',
    title: '60+ communities',
  },
  {
    to: '/assisted-living/florida/sacramento',
    image: assetPath('images/cities/Sacramento.jpeg'),
    alt: 'sacramento-assisted-living-seniorly',
    subtitle: 'Sacramento, CA',
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

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const HomePage = ({
  showModal, hideModal, onLocationSearch, setActiveDiscoverHome, queryParams, setQueryParams, pathName, ishowSlyWorksVideoPlaying,
  toggleHowSlyWorksVideoPlaying, history,
}) => {
  const HeaderContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Find The Best Senior Living Near You
          </StyledHeading>
          <StyledLabel palette="white">
            Search Assisted Living, Memory Care, Nursing Homes and More
          </StyledLabel>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
        <ImageCreditDiv>
          <ImageCreditLabel palette="white">
            Sagebrook Senior Living San Francisco
          </ImageCreditLabel>
        </ImageCreditDiv>
      </HeroWrapper>
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
    <CenteredTile key={mostSearchedCity.title} size="small" {...mostSearchedCity}>
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

  return (
    <>
      <Helmet>
        <title>Assisted Living Cost & Reviews | Senior Living Advisors</title>
        <meta name="description" content="Find the best assisted living and other senior living like nursing homes, memory care, respite care, CCRC, skilled nursing facilities, independent living and more." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <VideoSection title="How Seniorly Can Help You Find The Best Senior Living Options" subtitle="This short video will explain how Seniorly can help you find the best assisted living or any senior living community. Call us at (855) 866-4515." id="watch-video">
          <HowSlyWorksVideo
            isPlaying={ishowSlyWorksVideoPlaying}
            onThumbnailClick={toggleHowSlyWorksVideoPlaying}
            onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', 'home', e.target.currentTime)}
            onPlay={e => sendEvent('howSlyWorksVideo', 'play', 'home', e.target.currentTime)}
          />
        </VideoSection>
        <Hr />
        <StyledSection title="Discover The Best Senior Living Near You">
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
            Find the best assisted living communities, memory care facilities and more within 8 of the most searched
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
            , you will find photos, estimated cost per month, unique property highlights and more.
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
        </StyledSection>
        <SeoLinks title="Assisted living by Cities" links={ALSeoCities} />
        <SeoLinks title="Assisted living by State" links={ALSeoStates} />
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
};

export default HomePage;
