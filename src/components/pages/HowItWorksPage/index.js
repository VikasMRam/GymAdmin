import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { size, palette } from 'sly/components/themes';
import { Icon, Hr, Heading, Block, Link, Image } from 'sly/components/atoms';
import DiscoverTile from 'sly/components/molecules/DiscoverTile';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';
import { howItWorksContents, secondContents } from 'sly/services/helpers/howItWorks';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { MostSearchedCities } from 'sly/services/helpers/homepage';
import Footer from 'sly/components/organisms/Footer';

const IntroText = styled.div`
  font-size: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col9')};
    margin-right: ${size('layout.gutter')};
  }
`;

const IntroLogo = styled.div`
  padding-right: ${size('spacing.xxxLarge')};
  text-align: right;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col3')};
  }
`;

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.huge')};
`;

const ContentHeading = styled.div`
  font-size: 30px;
  margin-bottom: ${size('spacing.regular')};
`;

const ContentSubheading = styled.div`
  color: ${palette('slate', 'filler')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const DiscoverTiles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${size('spacing.xxxLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }

  > * {
    margin-bottom: ${size('spacing.xLarge')};

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: calc(100% / 3 - ${size('spacing.xLarge')});
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;

const SecondContentHeading = styled.div`
  margin: 0 auto;
  font-size: ${size('text.title')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const SecondContentTiles = styled.div`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }

  > * {
    margin-bottom: ${size('spacing.xLarge')};

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: calc(100% / 2 - ${size('spacing.xLarge')});
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;

const BottomContent = styled.div`
  background-color: ${palette('secondary', 'stroke')};
  padding-top: ${size('spacing.huge')};
`;

const CenterBottom = styled.div`
  margin: 0 ${size('spacing.large')};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0 auto;
    width: ${size('layout.col8')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const BottomContentHeading = styled.div`
  margin: 0 auto;
  margin-bottom: ${size('spacing.large')};
  font-size: ${size('text.title')};
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  margin: 0 auto;
  margin-bottom: ${size('spacing.xxLarge')};
`;

const CityTileHeading = styled.div`
  margin: 0 auto;
  margin-bottom: ${size('spacing.large')};
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const CityTiles = styled.div`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }

  > * {
    margin-bottom: ${size('spacing.xLarge')};

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: calc(100% / 2 - ${size('spacing.xLarge')});
      margin-right: ${size('spacing.xLarge')};
    }

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: calc(100% / 4 - ${size('spacing.xLarge')});
    }
  }
`;

const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityTileWrapper = styled(Link)`
  display: block;
  overflow: hidden;
  border-radius: ${size('spacing.small')};
`;


// const hiwDetailUrl = data => `/how-it-works/${data.slug}`;

const HowItWorksPage = () => {
  const intro = (
    <>
      <Helmet>
        <title>Search Senior Living Communities Near You</title>
        <meta name="description" content="With Seniorly you can find pricing, availability, amenities and more for over 30,000 senior living communities nationwide. Connect with your local senior living expert who can personalize your senior care search." />

      </Helmet>
      <IntroText>
        Seniorly is committed to connecting our aging citizens with a home to love.
        We achieve this through a personalized experience built on industry expertise and powerful technology.
      </IntroText>
      <IntroLogo>
        <Icon icon="logo" size="xxLarge" />
      </IntroLogo>
    </>
  );

  const discoverTiles = Object.entries(howItWorksContents)
    .map(([data]) => (
      <DiscoverTile
        key={data.url}
        content={data}
        to={data.url}
      />
    ));

  // const secondContentTiles = secondContents.map((item, index) => {
  //   return (
  //     <IconInfoTile
  //       key={index}
  //       {...item}
  //     />
  //   );
  // });

  const Bottom = () => {
    const mostSearchedCitiesComponents = MostSearchedCities
      .map(mostSearchedCity => (
        <CityTileWrapper key={mostSearchedCity.title} to={mostSearchedCity.to}>
          <Image aspectRatio="16:9" src={mostSearchedCity.image}>
            <ImageContent>
              <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
              <Block palette="white">{mostSearchedCity.title}</Block>
            </ImageContent>
          </Image>
        </CityTileWrapper>
      ));

    return (
      <>
        <BottomContent>
          <CenterBottom>
            <BottomContentHeading>Ready to find a new home?</BottomContentHeading>
            <StyledSearchBoxContainer layout="homeHero" />
            <CityTileHeading>Or Explore Our Most Searched Cities</CityTileHeading>
            <CityTiles>{mostSearchedCitiesComponents}</CityTiles>
          </CenterBottom>
        </BottomContent>
        <Footer />
      </>
    );
  };

  return (
    <OverlappingSectionsTemplate
      imagePath="images/how-it-works/hero.png"
      intro={intro}
      description={null}
      footer={<Bottom />}
    >
      <ContentHeading>Who is Seniorly for?</ContentHeading>
      <ContentSubheading>For families to help their aging relatives find a home to love.
        <br />For senior communities to connect with highly qualified prospects.
        <br />For referral agents to partner with us to help families locally.
      </ContentSubheading>
      <DiscoverTiles>{discoverTiles}</DiscoverTiles>
      <StyledHr />
      <SecondContentHeading>A Powerful and Easy Online Listing Platform For All</SecondContentHeading>
      <SecondContentTiles>
        {secondContents.map((item, index) => (
          <IconInfoTile
            key={index}
            {...item}
          />
        ))}
      </SecondContentTiles>
    </OverlappingSectionsTemplate>
  );
};

export default HowItWorksPage;
