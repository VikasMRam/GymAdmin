import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, object } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Link, Label, Heading, Hr } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import HowItWorksInfoTile from 'sly/components/molecules/HowItWorksInfoTile';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import { FAQ } from 'sly/services/helpers/howItWorks';
import FAQTile from 'sly/components/molecules/FAQTile';

// Copied from BasePageTemplate
const FixedWidthContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('grayscale', 0)};
  height: calc(${size('header.home.heroImage.mobileHeight')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
  }
`;
const HeroBackgroundImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const HeroTextWrapper = styled.div`
  position: absolute;
  top: 40%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const HeroHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;
const HeroSubheading = styled(Label)`
  margin-bottom: ${size('spacing.large')};
`;

const BlueBRWrapper = styled.div`
  background-color: ${palette('secondary', 3)};
`;

const BottomWrapper = styled.div`
  padding: ${size('spacing.massive')} 0;
`;

const FAQTilesWrapper = styled.div`
  margin: 0 180px;
`;

const XXXLargeHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: inherit;

  display: flex;
  border: ${size('border.regular')} solid ${palette('secondary', 3)};
  border-radius: ${size('spacing.small')};
`;

const Tab = styled(Link)`
  background-color: ${p => p.active ? palette('white', 0) : palette('grayscale', 3)};
  padding: ${size('spacing.xLarge')} 0;
  flex-grow: 1;
  font-size: ${size('spacing.subtitle')};
  font-weight: bold;
  text-align: center;
  color: ${p => p.active ? palette('black', 0) : palette('grayscale', 1)};

  :hover {
    cursor: ${p => !p.active ? 'pointer' : ''};
  }
`;

const Header = ({ heroImageUrl, heading, subheading, children }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <HeaderContainer />
    <HeroWrapper>
      <HeroBackgroundImage src={assetPath(heroImageUrl)} alt="A Home To Love" />
      <FixedWidthContainer>
        <HeroTextWrapper>
          <HeroHeading level="hero" size="hero" palette="white">
            {heading}
          </HeroHeading>
          <HeroSubheading palette="white">
            {subheading}
          </HeroSubheading>
        </HeroTextWrapper>
        {/*<TabsWrapper>
          {children}
        </TabsWrapper>*/}
      </FixedWidthContainer>
    </HeroWrapper>
  </Fragment>
);

const ForFamiliesComponents = ({ contents }) => contents
  .map((content, index) => {
    const invert = index % 2 === 1;
    return (
      <HowItWorksInfoTile
        key={content.heading}
        invert={invert}
        {...content}
      />
    );
  });

const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${size('spacing.massive')} 0;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const CardTiles = styled.div`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }

  > * {
    margin-bottom: ${size('spacing.xLarge')};

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: calc(100% / 2 - ${size('spacing.xLarge')});
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;

const Bottom = () => {
  return (
    <BlueBRWrapper>
      <FixedWidthContainer>
        <BottomWrapper>
          <StyledHeading>FAQ</StyledHeading>
          <FAQTilesWrapper>
            {FAQ.map((item, index) => (
              <Fragment key={item.question}>
                <FAQTile {...item} />
              </Fragment>
            ))}
            <XXXLargeHr />
          </FAQTilesWrapper>
        </BottomWrapper>
      </FixedWidthContainer>
      <Footer />
    </BlueBRWrapper>
  );
};

const HowItWorksDetailPage = ({
  heading,
  subheading,
  heroImageUrl,
  tabs,
  contents,
  cards,
  onTabClick,
  activeType,
  onLocationSearch,
}) => {
  const header = (
    <Header heroImageUrl={heroImageUrl} heading={heading} subheading={subheading}>
      {Object.entries(tabs)
        .map(([key, tab]) => {
          return (
            <Tab active={(key === activeType).toString()} key={key} to={tab.url}>
              {tab.tabText}
            </Tab>
          );
        })
      }
    </Header>
  );
  return (
    <BasePageTemplate
      header={header}
      footer={<Bottom />}
    >
      <ForFamiliesComponents contents={contents} />
      <Hr />
      <CardsSection>
        <StyledHeading>Why Use Seniorly</StyledHeading>
        <CardTiles>
          {cards.map((item, index) => (
            <IconInfoTile
              key={index}
              {...item}
            />
          ))}
        </CardTiles>
      </CardsSection>
    </BasePageTemplate>
  );
};

HowItWorksDetailPage.propTypes = {
  heading: string,
  subheading: string,
  imageUrl: string,
  contents: arrayOf(object),
  tabs: object,
  activeType: string,
  onTabClick: func,
  onLocationSearch: func,
};

export default HowItWorksDetailPage;
