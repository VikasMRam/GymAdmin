import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, object } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Hr } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import HowItWorksInfoTile from 'sly/components/molecules/HowItWorksInfoTile';
import { secondContents, FAQ } from 'sly/services/helpers/howItWorks';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
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

const SecondContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${size('spacing.massive')} 0;
`;

const SecondContentHeading = styled.div`
  margin: 0 auto;
  font-size: 30px;
  margin-bottom: ${size('spacing.xLarge')};
`;

const SecondContentTilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SecondContentTileWrapper = styled.div`
  width: ${size('picture.xLarge.width')};
  margin-right: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};

  :nth-child(2n){
    margin-right: 0;
  }
`;

const BlueBRWrapper = styled.div`
  background-color: ${palette('secondary', 3)};
`;

const BottomWrapper = styled.div`
  padding: ${size('spacing.massive')} 0;
`;

const BottomHeading = styled.div`
  font-size: 30px;
  margin: 0 auto;
  margin-bottom: ${size('spacing.xLarge')};
  text-align: center;
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

const Tab = styled.div`
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

const HowItWorksDetailPage = ({
  heading, subheading, imageUrl, contents, tabs, onTabClick, activeType, onLocationSearch,
}) => {
  const tabComponents = tabs.map((tab) => {
    return <Tab active={tab.key === activeType} key={tab.key} onClick={() => onTabClick(tab)} >{tab.text}</Tab>;
  });
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <HeroBackgroundImage src={imageUrl} alt="A Home To Love" />
        <FixedWidthContainer>
          <HeroTextWrapper>
            <HeroHeading level="hero" size="hero" palette="white">
              {heading}
            </HeroHeading>
            <HeroSubheading palette="white">
              {subheading}
            </HeroSubheading>
          </HeroTextWrapper>
          <TabsWrapper>
            {tabComponents}
          </TabsWrapper>
        </FixedWidthContainer>
      </HeroWrapper>
    </Fragment>
  );

  const ForFamiliesComponents = contents.map((content, index) => {
    const invert = index % 2 === 1;
    return (<HowItWorksInfoTile {...content} key={content.heading} invert={invert} />);
  });

  const secondContentTiles = secondContents.map((item) => {
    return (
      <SecondContentTileWrapper key={item.heading} >
        <IconInfoTile {...item} />
      </SecondContentTileWrapper>
    );
  });

  const faqTiles = FAQ.map((item, index) => {
    return (
      <Fragment>
        <FAQTile {...item} key={item.question} />
        {index !== FAQ.length - 1 && <XXXLargeHr />}
      </Fragment>
    );
  });

  const Bottom = () => {
    return (
      <BlueBRWrapper>
        <FixedWidthContainer>
          <BottomWrapper>
            <BottomHeading>FAQ</BottomHeading>
            <FAQTilesWrapper>{faqTiles}</FAQTilesWrapper>
          </BottomWrapper>
        </FixedWidthContainer>
        <Footer />
      </BlueBRWrapper>
    );
  };

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Bottom />}
    >
      {ForFamiliesComponents}
      <Hr />
      <SecondContentWrapper>
        <SecondContentHeading>Why Use Seniorly</SecondContentHeading>
        <SecondContentTilesWrapper>{secondContentTiles}</SecondContentTilesWrapper>
      </SecondContentWrapper>
    </BasePageTemplate>
  );
};

HowItWorksDetailPage.propTypes = {
  heading: string,
  subheading: string,
  imageUrl: string,
  contents: arrayOf(object),
  tabs: arrayOf(object),
  activeType: string,
  onTabClick: func,
  onLocationSearch: func,
};

export default HowItWorksDetailPage;
