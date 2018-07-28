import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Icon, Hr, Heading, Block, Link } from 'sly/components/atoms';
import DiscoverTile from 'sly/components/molecules/DiscoverTile';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';
import { discoverTileContents, secondContents } from 'sly/services/helpers/how_it_works';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { MostSearchedCities } from 'sly/services/helpers/homepage';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';
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
  margin: 72px 0;
`;

const ContentWrapper = styled.div`
  margin-bottom: 72px;
`;

const ContentHeading = styled.div`
  font-size: 30px;
  margin-bottom: ${size('spacing.regular')};
`;

const ContentSubheading = styled.div`
  color: ${palette('grayscale', 1)};
  margin-bottom: ${size('spacing.xLarge')};
`;

const DiscoverTilesWrapper = styled.div`
  display: flex;
`;

const DiscoverTileWrapper = styled.div`
  margin-right: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};

  :nth-child(3n) {
    margin-right: 0;
  }
`;

const SecondContentHeading = styled.div`
  font-size: 30px;
  margin-bottom: ${size('spacing.xLarge')};
`;

const SecondContentTilesWrapper = styled.div`
  column-gap: ${size('spacing.xLarge')};
  column-width: ${size('picture.xLarge.width')};
`;

const SecondContentTileWrapper = styled.div`
  width: ${size('picture.xLarge.width')};
  margin-bottom: ${size('spacing.xLarge')};
  column-break-inside: avoid;

`;

const BlueBGWrapper = styled.div`
background-color: #E1EAEF;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    grid-column: 2 / span 1;
    grid-row: 2 / span 2;
  }

  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    grid-column: 3 / span 1;
  }
`;

const BottomContentHeading = styled.div`
  margin: 0 auto;
  margin-top: 72px;
  margin-bottom: 24px;
  font-size: 30px;
`;

const SearchBoxContainerWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 72px;
`;

const CityTileHeading = styled.div`
  margin: 0 auto;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: bold;
`;

const CityTilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 72px;
`;

const CityTileWrapper = styled(Link)`
  // this is required for IE as it won't consider inline elements as flex children
  display: block;
  margin-right: 24px;
  margin-bottom: 24px;

  :nth-child(4n) {
    margin-right: 0;
  }
`;

// Copied from OverlappingSectionsTemplate
const Grid = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    margin-top: -${size('home.introMargin')};
    grid-template-columns: auto ${size('layout.col12')} auto;
    grid-template-rows: auto auto auto;
  }
  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    grid-template-columns: auto ${size('spacing.huge')} ${size('layout.col12')} ${size('spacing.huge')} auto;
    grid-template-rows: auto auto auto;
  }
`;

function onClick() {
  alert('Click on DiscoverTile');
}

const HowItWorksPage = ({ onLocationSearch }) => {
  const imagePath = assetPath('images/how-it-works/hero.png');
  const intro = (
    <Fragment>
      <IntroText>
        Seniorly is committed to connecting our aging citizens with a home to love.
        We do this through a personalized experience built on industry expertise and powerful technology.
      </IntroText>
      <IntroLogo>
        <Icon icon="logo" size="xxLarge" />
      </IntroLogo>
    </Fragment>
  );
  const discoverTiles = discoverTileContents.map((data, index) => {
    const content = { ...data };
    content.imageUrl = assetPath(data.imageUrl);
    return (
      <DiscoverTileWrapper key={index}>
        <DiscoverTile content={content} onClick={onClick} />
      </DiscoverTileWrapper>
    );
  });
  const secondContentTiles = secondContents.map((item, index) => {
    return (
      <SecondContentTileWrapper key={index} >
        <IconInfoTile {...item} />
      </SecondContentTileWrapper>
    );
  });
  const content = (
    <ContentWrapper>
      <ContentHeading>Who is Seniorly for?</ContentHeading>
      <ContentSubheading>For families to help their aging relatives find a home to love.
        <br />For senior communities to connect with highly qualified prospects.
        <br />For referral agents to partner with us to help families locally.
      </ContentSubheading>
      <DiscoverTilesWrapper>{discoverTiles}</DiscoverTilesWrapper>
      <StyledHr />
      <SecondContentHeading>A Powerful and Easy Online Listing Platform For All</SecondContentHeading>
      <SecondContentTilesWrapper>{secondContentTiles}</SecondContentTilesWrapper>
    </ContentWrapper>
  );
  const Bottom = () => {
    const mostSearchedCitiesComponents = MostSearchedCities.map(mostSearchedCity => (
      <CityTileWrapper key={mostSearchedCity.title} to={mostSearchedCity.to}>
        <ImageOverlayContentTile size="small" image={mostSearchedCity.image}>
          <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
          <Block palette="white">{mostSearchedCity.title}</Block>
        </ImageOverlayContentTile>
      </CityTileWrapper>
    ));
    return (
      <Fragment>
        <BlueBGWrapper>
          <Grid>
            <BottomContent>
              <BottomContentHeading>Ready to find a new home?</BottomContentHeading>
              <SearchBoxContainerWrapper><SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} /></SearchBoxContainerWrapper>
              <CityTileHeading>Or Explore Our Most Seached Cities</CityTileHeading>
              <CityTilesWrapper>{mostSearchedCitiesComponents}</CityTilesWrapper>
            </BottomContent>
          </Grid>
        </BlueBGWrapper>
        <Footer />
      </Fragment>
    );
  };
  return (
    <OverlappingSectionsTemplate
      imagePath={imagePath}
      intro={intro}
      description={null}
      content={content}
      footer={<Bottom />}
    />
  );
};

export default HowItWorksPage;
